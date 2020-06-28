// Format Date and Time
function formatDateTime(timestamp) {
    let now = new Date();

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

//City Weather Details
function displayWeatherDetails(response) {
    let city = document.querySelector("#location");
    city.innerHTML = response.data.name;

    let temp = document.querySelector("#weather-temperature");
    temp.innerHTML = `${Math.round(response.data.main.temp)}°`;

    let description = document.querySelector("#weather-description");
    description.innerHTML = response.data.weather[0].description;

    let feelsLikeTemp = document.querySelector("#feels-like");
    feelsLikeTemp.innerHTML = `${Math.round(response.data.main.feels_like)} °`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;

    let date = document.querySelector("#date");
    date.innerHTML = formatDateTime(response.data.dt * 1000);

    let icon = document.querySelector("#icon-weather");
    icon.setAttribute("src",`src/${response.data.weather[0].icon}.svg`);
    icon.setAttribute("alt", response.data.weather[0].description);

    console.log(response.data);
}

let apiKey = "248526705cf1e69e1604c72809dd3b61";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeatherDetails);
