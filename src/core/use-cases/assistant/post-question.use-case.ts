import { QuestionResponse } from "../../../interfaces";

export const postQuestionUseCase = async (question: string, threadId: string) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/user-question`, {
            method: "POST",
            body: JSON.stringify({ question, threadId}),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const replies = await resp.json() as QuestionResponse[];

        return replies;
    } catch (error) {
        throw new Error("Error posting question");
    }
}