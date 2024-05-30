import { useRef, useState } from "react";
import {
    GptMessage,
    TextMessageBox,
    TypingLoaders,
    UserMessage,
} from "../../components";
import { prosConsStreamGeneratorUseCase } from "../../../core/use-cases";

interface Message {
    text: string;
    isGpt: boolean;
}

export const ProsConsStreamPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const abortController = useRef(new AbortController());
    const isRunning = useRef(false);

    const handlePost = async (text: string) => {
        if (isRunning.current) {
            abortController.current.abort();
            abortController.current = new AbortController();
        }

        setIsLoading(true);
        isRunning.current = true;
        setMessages((prev) => [...prev, { text, isGpt: false }]);

        //with ProsConsStream
        // const reader = await prosConsStreamUseCase(text);
        // setIsLoading(false);

        // if(!reader) return alert("No se pudo realizar la comparación");
        // //Generar el ultimo mensaje
        // const decoder = new TextDecoder();
        // let message = "";
        // setMessages((prev) => [...prev, { text: message, isGpt: true }]);

        // while (true) {
        //     const { done, value } = await reader.read();

        //     if (done) {
        //         break;
        //     }

        //     message += decoder.decode(value, { stream: true });
        //     setMessages((prev) => {
        //       const newMessages = [...prev];
        //       newMessages[newMessages.length - 1].text = message;
        //       return newMessages;
        //     });
        // }

        //*With ProsConsStreamGenerator
        const stream = prosConsStreamGeneratorUseCase(
            text,
            abortController.current.signal
        );
        setIsLoading(false);

        setMessages((prev) => [...prev, { text: "", isGpt: true }]);

        for await (const message of stream) {
            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = message;
                return newMessages;
            });
        }

        isRunning.current = false;
    };
    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    <GptMessage text="¿Qué deseas comparar hoy?" />

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
