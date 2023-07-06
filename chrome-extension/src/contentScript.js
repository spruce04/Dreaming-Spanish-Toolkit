//when the window reloads
window.addEventListener("load", (event) => {
  console.log('reload content');
  send({reload: 'reload'});
});

//listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.content === "get monthly stats") { //if we are told to get monthly stats
      send({monthlyStats : monthlyOverview()}); //get them and send them to background.js
    }
    else if ('display' in message) {//change between light and dark mode
      if(message.display == "dark") {
        document.body.classList.remove('lightMode');
        document.body.classList.add('darkMode');
      }
      else {
        document.body.classList.remove('darkMode');
        document.body.classList.add('lightMode');
      };
    };
  }
);

//send messages from the content script
async function send(message) {
  const response = await chrome.runtime.sendMessage(message);
}

//code to get monthly stats
function monthlyOverview() {
  //gather all the days
  let daysLogged = document.getElementsByClassName("ds-form-calendar__column-time");
  let allDays = document.getElementsByClassName("ds-form-calendar__column--day-number")

  //loop through all the days and sum the total amount of time
  let watched = 0;
  for(let i = 0; i < daysLogged.length; i++) {
      let dailyTime = parseInt(daysLogged[i].textContent.slice(0, daysLogged[i].textContent.length - 1)); //cut out the 'm'
      watched += dailyTime;
  };

  //Turn the minutes only into hours and minutes to find the total time
  let hourCount = parseInt(watched/60);
  let minuteCount = watched - 60 * hourCount;

  //Find the daily average - note that this will include days that haven't yet passed
  let average = watched / (allDays.length);
  let avgHours = parseInt(average/60);
  let avgMins = (average - 60 * avgHours).toFixed(1);
  
  return `Total watched this month: ${hourCount} hour(s) and ${minuteCount} minute(s). \nAverage time each day: ${avgHours} hour(s) and ${avgMins} minute(s).`;
}