// Global DOM elements
// We cache them once, and avoid them being queried multiple times
const daysLogged = document.getElementsByClassName("ds-form-calendar__column-time");
const allDays = document.getElementsByClassName("ds-form-calendar__column--day-number");

//Update the DS results page with a progress card
//background setup
function progressCardCreate() {
  const activityCardArray = document.getElementsByClassName("ds-your-activity-card__block");
  const activityCard = activityCardArray[0]; //this is the one we want to modify
  let progressCard = activityCard.appendChild(document.createElement("div"));
  progressCard.className = "ds-mini-card ds-mini-card--secondary card";

  let progressCardBody = progressCard.appendChild(document.createElement("div"));
  progressCardBody.className = "ds-mini-card__body card-body";

  let progressCardHeader = progressCardBody.appendChild(document.createElement("div"));
  progressCardHeader.className = "ds-mini-card__header";

  let progressCardTitle = progressCardHeader.appendChild(document.createElement("div"));
  progressCardTitle.className = "ds-mini-card__header-title";

  let progressCardIcon = progressCardTitle.appendChild(document.createElement("img"));
  progressCardIcon.className = "ds-mini-card__header-icon";
  progressCardIcon.src = 'https://github.com/spruce04/Dreaming-Spanish-Toolkit/blob/main/chrome-extension/images/statsIcon.png';

  let progressHeaderText = progressCardTitle.appendChild(document.createElement("span"));
  progressHeaderText.textContent = "Monthly Stats";

  let progressCardUpdate = progressCardHeader.appendChild(document.createElement("button"));
  progressCardUpdate.classList.add("ds-mini-card__header-value", "refreshStats");
  progressCardUpdate.textContent = "Reload";

  let progressCardContentBox = progressCardBody.appendChild(document.createElement("div"));
  progressCardContentBox.className = "ds-mini-card__content";

  let progressCardText = progressCardContentBox.appendChild(document.createElement("p"));
  progressCardText.className = "ds-mini-card__content-description";

  let progressCardTextTotal = progressCardText.appendChild(document.createElement("p"));
  progressCardTextTotal.className = "statText";

  let progresscardTextAverage = progressCardText.appendChild(document.createElement("p"));
  progresscardTextAverage.className = "statText";

  const stats = monthlyOverview();
  progressCardTextTotal.textContent = stats.total;
  progresscardTextAverage.textContent = stats.average;

  //refresh button
  progressCardUpdate.addEventListener("click", () => {
    const stats = monthlyOverview();
    progressCardTextTotal.textContent = stats.total;
    progresscardTextAverage.textContent = stats.average;
  }) 
}

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if ('display' in message || 'reload' in message) {
      if(message['progressPage'] === true) {
        progressCardCreate()
      }
      if (message.display === "dark" || message.reload === "dark") {
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
  //loop through all the days and sum the total amount of time
  let watched = 0;
  for (let i = 0; i < daysLogged.length; i++) {
      watched += parseInt(daysLogged[i].textContent.slice(0, daysLogged[i].textContent.length - 1)); //cut out the 'm'
  };

  //Turn the minutes only into hours and minutes to find the total time
  let hourCount = parseInt(watched / 60);
  let minuteCount = watched - 60 * hourCount;

  //Find the daily average
  let average;
  let avgHours;
  let avgMins;

  //Check if we are looking in the current month and year
  let dreamingCalendar = document.getElementsByClassName("ds-form-calendar__nav");
  let timeArray = dreamingCalendar[0].textContent.replaceAll(' ', '').split("-");
  const timeObject = new Date();
  const year = timeObject.getFullYear();
  const month = timeObject.toLocaleString('default', {month: 'long'});
  if (month == timeArray[0] && year == timeArray[1]) {//if we are in the current month adjust the average accordingly
    const date = timeObject.getDate();
    average = watched / date;
    avgHours = parseInt(average / 60);
    avgMins = (average - 60 * avgHours).toFixed(1);
  }
  else {
    average = watched / (allDays.length);
    avgHours = parseInt(average / 60);
    avgMins = (average - 60 * avgHours).toFixed(1);
  }

  return {total: `Total watched this month: ${hourCount} hour(s) and ${minuteCount} minute(s).`, average: `Average time each day: ${avgHours} hour(s) and ${avgMins} minute(s).`} 
}