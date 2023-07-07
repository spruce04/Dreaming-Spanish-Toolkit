const storage = chrome.storage.local;

async function getDisplayMode() {
    const result = await storage.get(["displayMode"]);
    return result["displayMode"];
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.startsWith("https://www.dreamingspanish.com/")) {
        const displayMode = await getDisplayMode();
        send({
            reload: displayMode
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.content === "get monthly stats") {
        send({
            content: "get monthly stats"
        });
    } else if (message.monthlyStats) {
        send({
            monthlyStats: message.monthlyStats
        });
    } else if (message.content === "change display") {
        send({
            display: message.display
        });
    }
});

function send(message) {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, message);
    });
}