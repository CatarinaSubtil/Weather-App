// Format Date and Time
formatDateTime(date) {
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

    let hours = now.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
    }

    let minutes = now.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }

    return `${weekDay[now.getDay()]},
    ${now.getDate()} ${month[now.getMonth()]} ${now.getFullYear()} | ${hour}:${minutes}`;
}

let newDate = document.querySelector("#date");
let now = new Date();
newDate.innerHTML = formatDateTime(now);

