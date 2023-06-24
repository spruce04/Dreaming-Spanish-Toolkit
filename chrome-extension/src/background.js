//see if the current tab is the progress tab
chrome.tabs.onUpdated.addListener(async() => {
    let currentTab = await getCurrentTab();
    //if it is, send a message to our content script to do something
    if(currentTab.url == "https://www.dreamingspanish.com/progress") {
        chrome.runtime.sendMessage('get monthly stats').then(function (response) {
            console.log(response)
        })
    }
}) 
//get our current tab
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}