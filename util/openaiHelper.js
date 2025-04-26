// gen ai response for openai

export async function generateResponse(prompt, system = `You are a helpful assistant.`, test = false) {
    const endpoint = "https://api.openai.com/v1/responses"
    const token = await chrome.storage.local.get("apiKey");
    console.log(token);
    // Create response api call
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.apiKey}`
            },
            body: JSON.stringify({
                "model": "gpt-4o-mini",
                "instructions": system,
                "input": prompt
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data.output[0].content[0].text.trim()
        });
        return response;
}
