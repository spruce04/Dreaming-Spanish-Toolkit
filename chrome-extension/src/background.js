//listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.content == "get monthly stats") { //if the monthly stats button is pressed
        send({content : "get monthly stats"}); //tell contentScript.js to get the stats
    }
    else if (message.monthlyStats) { // if we get given back monthly stats by the contentScript
        send({monthlyStats : message.monthlyStats}); //send them to popup.js to update the extension display
    }
    else if (message.content == ("change display")) { //if we get told to toggle from light to dark mode
        console.log("gotit1" , message.display)
        send({display: message.display});
    }
    else if ('reload' in message) {//when the window reloads
        console.log('reload background')
        send({reload: 'reload'});
    }
  });
  
//send messages from the background script
async function send(message) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, message);
}