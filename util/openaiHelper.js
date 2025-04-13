
class OpenAIHelper {
    static async #getAccessToken(test = false) {
        if (test) {
            return process.env.key;
        }
        return chrome.storage.local.get("apiKey");
    }

    static async gen(prompt, system = `You are a helpful assistant.`, test = false) {
        const endpoint = "https://api.openai.com/v1/responses"

        // Create response api call
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await this.#getAccessToken(test)}`
                },
                body: JSON.stringify({
                    "model": "gpt-4o-mini",
                    "instructions": system,
                    "input": prompt
                })
            })
                .then(res => res.json())
                .then(data => data.output[0].content[0].text);
            return response;
    }
}

export default OpenAIHelper;