// Format Date and Time
function formatDateTime(date) {
    let weekDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    
    let month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let hour = now.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${weekDay[now.getDay()]},
    ${now.getDate()} ${month[now.getMonth()]} ${now.getFullYear()} ${hour}:${minutes}`;
}

let newDate = document.querySelector("#date");
let now = new Date();
newDate.innerHTML = formatDateTime(now);


