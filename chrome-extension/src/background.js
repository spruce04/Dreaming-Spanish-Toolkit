//add a listener to the progress button
const gatherMonthlyStats = document.getElementById("monthlyStats");

gatherMonthlyStats.addEventListener("click", (async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        // do something with response here, not outside the function
        console.log(response);   
  })())