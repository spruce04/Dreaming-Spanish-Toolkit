//not currently working / work in progress

document.addEventListener('DOMContentLoaded', function () {
    const updatable = document.getElementById("updatableMonthlyStats");
})



//code to get monthly total and daily average for a month
function monthlyStats() {
    console.log('entered')
    let daysLoggedTest = chrome.tabs.executeScript(tab.id,{code:   `document.getElementsByClassName("ds-form-calendar__column-time`},sendCurrentTitle);
    let allDaysTest = chrome.tabs.executeScript(tab.id,{code:   `document.getElementsByClassName("ds-form-calendar__column--day-number`},sendCurrentTitle);
    console.log(daysLoggedTest)
    

    
    //gather all the days
    let daysLogged = chrome.getElementsByClassName("ds-form-calendar__column-time");
    let allDays = chrome.getElementsByClassName("ds-form-calendar__column--day-number")

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
    
    if (getCurrentTabUrl().includes("dreamingspanish.com/progress") === false) {
        return `Total watched this month: ${hourCount} hours and ${minuteCount} minutes. \nAverage time each day: ${avgHours} hour(s) and ${avgMins} minutes.`;
    }
    else {
        return 'I was unable to gather monthly data for the page you performed the request on.';
    }
    
}