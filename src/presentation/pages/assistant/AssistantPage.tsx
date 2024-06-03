import { useEffect, useState } from "react";
import {
    GptMessage,
    TextMessageBox,
    TypingLoaders,
    UserMessage,
} from "../../components";
import {
    createThreadUseCase,
    postQuestionUseCase,
} from "../../../core/use-cases";

interface Message {
    text: string;
    isGpt: boolean;
}

export const AssistantPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const [threadId, setThreadId] = useState<string>();

    useEffect(() => {
        const threadId = localStorage.getItem("threadId");
        if (!threadId) {
            createThreadUseCase().then((id) => {
                setThreadId(id);
                localStorage.setItem("threadId", id);
            });
        } else {
            setThreadId(threadId);
        }
    }, []);

    useEffect(() => {
        if (threadId) {
            setMessages((prev) => [
                ...prev,
                {
                    text: `Número de thread ${threadId}`,
                    isGpt: true,
                },
            ]);
        }
    }, [threadId]);

    const handlePost = async (text: string) => {
        if (!threadId) {
            return;
        }

        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false }]);

        //TODO UseCase
        const replies = await postQuestionUseCase(text, threadId);

        setIsLoading(false);

        //TODO Añadir el mensaje de gpt
        for (const reply of replies) {
            for (const message of reply.content) {
                setMessages((prev) => [
                    ...prev,
                    {
                        text: message,
                        isGpt: reply.role === "assistant",
                        info: reply,
                    },
                ]);
            }
        }
    };
    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    <GptMessage text="Buen dia, soy Sam ¿En qué puedo ayudarte?" />

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
