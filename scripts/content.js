console.log("content");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    let element;
    switch (message.task) {
        case "get-text":
            element = document.activeElement;
            const text = element.value || null;
            sendResponse({ element: element, text: text });
            break;

        case "replace-text":
            element = document.activeElement;
            element.value = message.text;
            break;
        default:
            return false;
    }
    return true;
})