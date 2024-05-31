import { useState } from "react";
import {
    GptMessage,
    GptMessageAudio,
    TextMessageBoxSelect,
    TypingLoaders,
    UserMessage,
} from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";

const disclaimer = `##¿Qué audio quieres generar hoy?
* Todo el audio generado es por AI.
`;

const voices = [
    { id: "nova", name: "Nova" },
    { id: "alloy", name: "Alloy" },
    { id: "echo", name: "Echo" },
    { id: "fable", name: "Fable" },
    { id: "onyx", name: "Onyx" },
    { id: "shimmer", name: "Shimmer" },
];

interface TextMessage {
    text: string;
    isGpt: boolean;
    type: "text";
}

interface AudioMessage {
    text: string;
    isGpt: boolean;
    audio: string;
    type: "audio";
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handlePost = async (text: string, voice: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text, isGpt: false, type: "text" }]);

        //TODO UseCase
        const { ok, message, url } = await textToAudioUseCase(text, voice);

        if (!ok) return;

        setIsLoading(false);
        setMessages((prev) => [
            ...prev,
            {
                text: `${voice} - ${message}`,
                isGpt: true,
                type: "audio",
                audio: url,
            },
        ]);

        //TODO Añadir el mensaje de gpt
    };
    return (
        <div className="chat-container">
            <div className="chat-messages">
                <div className="grid grid-cols-12 gap-y-2">
                    <GptMessage text={disclaimer} />

                    {messages.map((message, index) =>
                        message.isGpt ? (
                            message.type === "audio" ? (
                                <GptMessageAudio
                                    key={index}
                                    text={message.text}
                                    audio={message.audio}
                                />
                            ) : (
                                <GptMessage key={index} text={message.text} />
                            )
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

            <TextMessageBoxSelect
                onSendMessage={handlePost}
                placeholder="Escribe tu texto aquí"
                options={voices}
            />
        </div>
    );
};
