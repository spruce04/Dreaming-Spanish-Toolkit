chrome.tabs.onUpdate.addListener((tabId, tab) => {
    if(tab.url && tab.url.includes("dreamingspanish.com")) {
        console.log('working')
    }
})