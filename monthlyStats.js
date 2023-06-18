//code to get monthly total and daily average - paste this into the console when in the progress page and press enter
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
    console.log(average)
    let avgHours = parseInt(average/60);
    let avgMins = (average - 60 * avgHours).toFixed(1);
    
    return `Total watched this month: ${hourCount} hours and ${minuteCount} minutes. \nAverage time each day: ${avgHours} hour(s) and ${avgMins} minutes`;
}
console.log(monthlyOverview());
