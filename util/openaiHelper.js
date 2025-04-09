import { AzureOpenAI } from "openai";
// TODO Reconfigure to use api, not sdk
class OpenAIHelper {
    static async #getClient() {
        const config = await chrome.storage.local.get("apiKey", "deployment", "endpoint");
        return new AzureOpenAI(config);
    }

    static async gen(prompt, system = ` `) {

            const messages = [
                {
                    role: 'system',
                    content: system
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]

            // CreateChatCompletion api call
            const client = await this.#getClient()
            const response = await client.chat.completions.create({
                messages
            });

            // get response from AI
            const message = response.choices[0].message.content.trim();
            console.log(message.length);
            return message;
    }
}

export default OpenAIHelper;