//dom selectors and other setup (for the extension)
const storage = chrome.storage.local;
const toggleDisplay = document.getElementById("toggleDarkMode");

// display if it is light or dark mode
let testingToggle = document.getElementById("testingToggle");
getDisplayMode().then((displayMode) => {
    testingToggle.textContent = displayMode;
});

// function to retrieve the display mode
async function getDisplayMode() {
    const result = await storage.get(["displayMode"]);
    return result["displayMode"];
}

// general dark mode function
async function changeMode() {
    let currentDisplay = await getDisplayMode();
    if (currentDisplay == "dark") {
        storage.set({
            displayMode: "light"
        }).then(() => {});
    } else {
        storage.set({
            displayMode: "dark"
        }).then(() => {});
    };
    let newDisplay = await getDisplayMode();
    testingToggle.textContent = newDisplay;
    send({
        content: "change display",
        display: newDisplay
    });
    console.log('sent');
}

// when the button to toggle dark mode is clicked, change the modes
toggleDisplay.addEventListener("click", () => {
    changeMode();
});


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