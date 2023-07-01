//listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.content == "get monthly stats") { //if the monthly stats button is pressed
        send({content : "get monthly stats"}); //tell contentScript.js to get the stats
    };
    if (message.monthlyStats) { // if we get given back monthly stats by the contentScript
        send({monthlyStats : message.monthlyStats}); //send them to popup.js to update the extension display
    };
  });
  
//send messages from the background script
async function send(message) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, message);
};