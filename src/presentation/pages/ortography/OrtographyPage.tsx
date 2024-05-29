import { useState } from "react";
import {
    GptMessage,
    TypingLoaders,
    UserMessage,
    TextMessageBox,
} from "../../components";

interface Message {
    text: string;
    isGpt: boolean;
}

export const OrtographyPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handlePost = async (text: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false }]);

        //TODO UseCase

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
                            <GptMessage key={index} text={message.text} />
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
