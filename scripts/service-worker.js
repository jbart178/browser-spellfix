import { generateResponse } from "../util/openaiHelper.js"

chrome.commands.onCommand.addListener(async (command) => {
    console.log(command);
    switch (command) {
        case  "run-spellfix":
            console.log("fixing text");
            const text = await sendMessageToActiveTab({ "task": "get-text"});
            console.log(text);
            console.log(text.text || `could not get value of ${text.element}`);
            if (text.text) {
                const response = await generateResponse(text.text, "You will correct spelling in provided prompts. You will return the users prompt with any spelling errors fixed. Be aware sometimes there are words that may be titles or names, these should not be corrected and you should usecontext to identify these so that you can leave them as they are. Return exactly the text that has been provided with any spelling errors and extremely obvious grammatical errors fixed");
                console.log(response);
                sendMessageToActiveTab({ "task": "replace-text", "text": response});
            }
            break;

        case "run-generate":
            console.log("generating text");
            break;

        default:
            console.log("Oops, this one hasn't been handled yet ... Someone should really get onto that");
    }
});

async function sendMessageToActiveTab(message) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, message);
    return response
}