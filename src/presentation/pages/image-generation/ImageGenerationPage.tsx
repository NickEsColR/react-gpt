import { useState } from "react";
import {
    GptMessage,
    GptMessageImage,
    TextMessageBox,
    TypingLoaders,
    UserMessage,
} from "../../components";
import { imageGenerationUseCase } from "../../../core/use-cases";

interface Message {
    text: string;
    isGpt: boolean;
    info?: {
        imageUrl: string;
        alt: string;
    };
}

export const ImageGenerationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handlePost = async (text: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false }]);

        //TODO UseCase
        const imageInfo = await imageGenerationUseCase(text);

        setIsLoading(false);

        if (!imageInfo) {
            return setMessages((prev) => [
                ...prev,
                { text: "No se pudo generar la imagen", isGpt: true },
            ]);
        }

        //TODO Añadir el mensaje de gpt
        setMessages((prev) => [
            ...prev,
            {
                text: text,
                isGpt: true,
                info: {
                    imageUrl: imageInfo.url,
                    alt: imageInfo.alt,
                },
            },
        ]);
    };
    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    <GptMessage text="¿Qué imagen deseas generar hoy?" />

                    {messages.map((message, index) =>
                        message.isGpt ? (
                            <GptMessageImage
                                key={index}
                                text={message.text}
                                imageUrl={message.info?.imageUrl!}
                                alt={message.info?.alt!}
                            />
                        ) : (
                            <UserMessage key={index} text={message.text} />
                        )
                    )}

                    {isLoading && (
                        <div className="col-start-1 col-end-12 fade-in">
                            <TypingLoaders />
                        </div>
                    )}
                </div>
            </div>

            <TextMessageBox
                onSendMessage={handlePost}
                placeholder="Escribe tu texto aquí"
                disableCorrections
            />
        </div>
    );
};
