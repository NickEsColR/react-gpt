export async function* prosConsStreamGeneratorUseCase(
    prompt: string,
    abortSignal: AbortSignal
) {
    try {
        const resp = await fetch(
            `${import.meta.env.VITE_API_URL}/pros-cons-discusser-stream`,
            {
                method: "POST",
                body: JSON.stringify({ prompt }),
                headers: {
                    "Content-Type": "application/json",
                },
                signal: abortSignal,
            }
        );

        if (!resp.ok) {
            throw new Error("No se pudo realizar la comparación");
        }

        const reader = resp.body?.getReader();

        if (!reader) {
            return null;
        }

        const decoder = new TextDecoder();
        let text = "";

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            text += decoder.decode(value, { stream: true });

            yield text;
        }
    } catch (error) {
        return null;
    }
}
