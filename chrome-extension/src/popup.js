//message sending template
async function send(message) {
    const response = await chrome.runtime.sendMessage(message);
};

//listen for things from the other scripts
chrome.runtime.onMessage.addListener(
    async function(message, sender, sendResponse) {
        //can be added to later
    }
);