//when a tab is updated
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.startsWith("https://app.dreaming.com/")) {
        if (
            tab.url.startsWith("https://app.dreaming.com/spanish/progress") ||
            tab.url.startsWith("https://app.dreaming.com/french/progress")) {
            send({
                progressPage: true
            })
        }
    }
});

//listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
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