import { TranslateResponse } from "../../interfaces/translate.response";

export const translateTextUseCase = async (prompt: string, lang: string) => {
    try {
        const respo = await fetch(`${import.meta.env.VITE_API_URL}/translate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt, lang }),
        });

        if (!respo.ok) throw new Error("No se pudo traducir");

        const {message} = await respo.json() as TranslateResponse;

        return {
            ok: true,
            message
        }

    } catch (error) {
        return {
            ok: false,
            message: "No se pudo traducir"
        }
    }
}