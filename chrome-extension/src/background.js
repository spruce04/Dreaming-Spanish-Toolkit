//when a tab is updated
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    //if its the progress tab, we want to load the stats card
    if (changeInfo.status === "complete" && tab.url.startsWith("https://www.dreamingspanish.com/progress")) {
        send({
            progressPage: true
        })
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