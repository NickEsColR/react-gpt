import { OrtographyResponse } from "../../interfaces";

export const textToAudioUseCase = async (prompt: string, voice: string) => {
    try {
        const resp = await fetch(
            `${import.meta.env.VITE_API_URL}/text-to-audio`,
            {
                method: "POST",
                body: JSON.stringify({ prompt, voice }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!resp.ok) {
            throw new Error("No se pudo realizar la generación de audio");
        }

        const audioFile = await resp.blob();
        const url = URL.createObjectURL(audioFile);

        return {
            ok: true,
            url,
            message: prompt,
        };
    } catch (error) {
        return {
            ok: false,
            message: "No se pudo realizar la generación del audio",
            url: "",
        };
    }
};
