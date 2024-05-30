
export const prosConsStreamUseCase = async (prompt: string) => {
    try {
        const resp = await fetch(
            `${import.meta.env.VITE_API_URL}/pros-cons-discusser-stream`,
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

        const reader = resp.body?.getReader();

        if (!reader) {
            return null;
        }

        return reader;

        // const decoder = new TextDecoder();
        // let text = "";

        // while (true) {
        //     const { done, value } = await reader.read();

        //     if (done) {
        //         break;
        //     }

        //     text += decoder.decode(value, {stream: true});
        //}
    } catch (error) {
        return null
    }
};
