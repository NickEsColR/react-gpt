import { ProsConsResponse } from "../../interfaces";

export const prosConsUseCase = async (prompt: string) => {
    try {
        const resp = await fetch(
            `${import.meta.env.VITE_API_URL}/pros-cons-discusser`,
            {
                method: "POST",
                body: JSON.stringify({ prompt }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!resp.ok) {
            throw new Error("No se pudo realizar la comparación");
        }

        const data = (await resp.json()) as ProsConsResponse;

        return {
            ok: true,
            ...data,
        };
    } catch (error) {
        return {
            ok: false,
            content: "No se pudo realizar la comparación",
        };
    }
};
