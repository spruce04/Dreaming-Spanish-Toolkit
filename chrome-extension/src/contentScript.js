// When the window reloads
window.addEventListener("load", () => {
  send({
      reload: 'reload'
  });
});

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.content === "get monthly stats") {
      send({
          monthlyStats: monthlyOverview()
      });
  } else if ('display' in message) {
      if (message.display === "dark") {
          document.body.classList.remove('lightMode');
          document.body.classList.add('darkMode');
      } else {
          document.body.classList.remove('darkMode');
          document.body.classList.add('lightMode');
      }
  } else if ('reload' in message) {
      if (message.reload === "dark") {
          document.body.classList.remove('lightMode');
          document.body.classList.add('darkMode');
      } else {
          document.body.classList.remove('darkMode');
          document.body.classList.add('lightMode');
      }
  }
});

// Send messages from the content script
function send(message) {
  chrome.runtime.sendMessage(message);
}

//code to get monthly stats
function monthlyOverview() {
  //gather all the days
  let daysLogged = document.getElementsByClassName("ds-form-calendar__column-time");
  let allDays = document.getElementsByClassName("ds-form-calendar__column--day-number")

  //loop through all the days and sum the total amount of time
  let watched = 0;
  for (let i = 0; i < daysLogged.length; i++) {
      let dailyTime = parseInt(daysLogged[i].textContent.slice(0, daysLogged[i].textContent.length - 1)); //cut out the 'm'
      watched += dailyTime;
  };

  //Turn the minutes only into hours and minutes to find the total time
  let hourCount = parseInt(watched / 60);
  let minuteCount = watched - 60 * hourCount;

  //Find the daily average - note that this will include days that haven't yet passed
  let average = watched / (allDays.length);
  let avgHours = parseInt(average / 60);
  let avgMins = (average - 60 * avgHours).toFixed(1);

  return `Total watched this month: ${hourCount} hour(s) and ${minuteCount} minute(s). \nAverage time each day: ${avgHours} hour(s) and ${avgMins} minute(s).`;
}