import { useState } from "react";
import {
    GptMessage,
    TextMessageBox,
    TypingLoaders,
    UserMessage,
} from "../../components";
import { prosConsUseCase } from "../../../core/use-cases";

interface Message {
    text: string;
    isGpt: boolean;
}

export const ProsConsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handlePost = async (prompt: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text: prompt, isGpt: false }]);

        const { ok, content } = await prosConsUseCase(prompt);

        setIsLoading(false);
        if (!ok) return;

        setMessages((prev) => [...prev, { text: content, isGpt: true }]);
    };
    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    <GptMessage text="puedes escribir lo que sea que quieres que compare y te de mis puntos de vista" />

                    {messages.map((message, index) =>
                        message.isGpt ? (
                            <GptMessage
                                key={index}
                                text={message.text}
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
