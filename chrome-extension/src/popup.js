//dom selectors (for the extension)
const updatable = document.getElementById("updatableMonthlyStats");
const gatherMonthlyStats = document.getElementById("monthlyStats");

//when the  monthly stats button is clicked, start the progress to gather monthly stats
gatherMonthlyStats.addEventListener("click", () => {
    send({content:'get monthly stats'}); //send a message to background.js
});

//message sending template
async function send(message) {
    const response = await chrome.runtime.sendMessage(message);
};

//listen for things from the other scripts
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      if ('monthlyStats' in message) { //if we get given monthly stats
        if(message.monthlyStats.includes("Average time each day: NaN hour(s) and NaN minutes.")) { //if button was clicked on a page other than results, do this
            updatable.textContent = "Please ensure you are on the progress page in order to view monthly stats.";
        }
        else { //if not, give the stats
            updatable.textContent = message.monthlyStats;
        };
      };
    }
);