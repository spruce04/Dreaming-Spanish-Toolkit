const storage = chrome.storage.local;

//retrieve the display mode
async function getDisplayMode() {
    const result = await storage.get(["displayMode"]);
    return result["displayMode"];
}

//when a tab is updated
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.startsWith("https://app.dreaming.com/")) {
        const displayMode = await getDisplayMode();
        if (
            tab.url.startsWith("https://app.dreaming.com/spanish/progress") ||
            tab.url.startsWith("https://app.dreaming.com/french/progress")) {
            send({
                reload: displayMode,
                progressPage: true
            })
        }
        send({
            reload: displayMode
        });
    }
});

//listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.content === "change display") {
        send({
            display: message.display
        });
    }
});

//send messages
function send(message) {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, message);
    });
}