import { useState } from "react";
import {
    GptMessage,
    TypingLoaders,
    UserMessage,
    TextMessageBox,
    GptOrtographyMessage,
} from "../../components";
import { ortographyUseCase } from "../../../core/use-cases";
import { OrtographyResponse } from "../../../interfaces";

interface Message {
    text: string;
    isGpt: boolean;
    info?: OrtographyResponse;
}

export const OrtographyPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handlePost = async (text: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false }]);

        const data = await ortographyUseCase(text);

        if (!data.ok) {
            setMessages((prev) => [
                ...prev,
                { text: "No se pudo realizar la corrección", isGpt: true },
            ]);
        } else {
            setMessages((prev) => [
                ...prev,
                { text: data.message, isGpt: true, info: { ...data } },
            ]);
        }

        setIsLoading(false);

        //TODO Añadir el mensaje de gpt
    };
    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    <GptMessage text="Hola, puedes escribir tu texto y te ayudo con las correcciones" />

                    {messages.map((message, index) =>
                        message.isGpt ? (
                            <GptOrtographyMessage
                                key={index}
                                {...message.info!}
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
