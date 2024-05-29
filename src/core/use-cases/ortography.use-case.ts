import { OrtographyResponse } from "../../interfaces";

export const ortographyUseCase = async (prompt: string) => {
    try {
        const resp = await fetch(
            `${import.meta.env.VITE_API_URL}/ortography-check`,
            {
                method: "POST",
                body: JSON.stringify({ prompt }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!resp.ok) {
            throw new Error("No se pudo realizar la corrección");
        }

        const data = (await resp.json()) as OrtographyResponse;

        return {
            ok: true,
            ...data,
        };
    } catch (error) {
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: "No se pudo realizar la corrección",
        };
    }
};
