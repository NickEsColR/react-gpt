import { useState } from "react";
import { GptMessage, TextMessageBox, TextMessageBoxSelect, TypingLoaders, UserMessage } from "../../components";
import { translateTextUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  {id:"aleman", text: "Alemán"},
  {id:"arabe", text: "Árabe"},
  {id:"bengali", text: "Bengalí"},
  {id:"frances", text: "Francés"},
  {id:"hindi", text: "Hindi"},
  {id:"ingles", text: "Inglés"},
  {id:"japones", text: "Japonés"},
  {id:"mandarin", text: "Mandarín"},
  {id:"portugues", text: "Portugués"},
  {id:"ruso", text: "Ruso"},
];

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, lang:string) => {
      setIsLoading(true);

      const msg = `Traduce: ${text} al idioma ${lang}`
      setMessages((prev) => [...prev, { text:msg, isGpt: false }]);

      //TODO UseCase
      const {ok, message} = await translateTextUseCase(text, lang);
      setIsLoading(false);
      if(!ok){
        return alert("No se pudo traducir")
      }
      setMessages((prev) => [...prev, { text:message, isGpt: true }]);

      //TODO Añadir el mensaje de gpt
  }
  return (
      <div className="chat-container">
          <div className="chat-messages">
              <div className="grid grid-cols-12 gap-y-2">
                  <GptMessage text="¿Qué quieres que traduzca hoy?" />

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

          <TextMessageBoxSelect
              onSendMessage={handlePost}
              placeholder="Escribe tu texto aquí"
              options={languages}
          />
      </div>
  );
};
