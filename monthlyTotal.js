const days = document.getElementsByClassName("ds-form-calendar__column-time ds-form-calendar__column-time--emphasized");
let hoursWatched = 0;
for(let i = 0; i < days.length; i++) {
    let dailyTime = parseInt(days[i].textContent.slice(0, days[i].textContent.length - 1));
    hoursWatched += dailyTime;
};
let hourCount = parseInt(hoursWatched/60);
minuteCount = hoursWatched - 60 * hourCount;
console.log(`Total watched this month: ${hourCount} hours and ${minuteCount} minutes`);
