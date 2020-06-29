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

    celsiusTemp = response.data.main.temp;

    let temp = document.querySelector("#weather-temperature");
    temp.innerHTML = `${Math.round(celsiusTemp)}°`;

    let description = document.querySelector("#weather-description");
    description.innerHTML = response.data.weather[0].description;

    celsiusFeelsLikeTemp = response.data.main.feels_like

    let feelsLikeTemp = document.querySelector("#feels-like");
    feelsLikeTemp.innerHTML = `${Math.round(celsiusFeelsLikeTemp)} °`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;

    let date = document.querySelector("#date");
    date.innerHTML = formatDateTime(response.data.dt * 1000);

    let icon = document.querySelector("#icon-weather");
    icon.setAttribute("src",`icons/${response.data.weather[0].icon}.svg`);
    icon.setAttribute("alt", response.data.weather[0].description);
}

//Search Engine - Change City input
function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherDetails);
}

function changeCity(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#changeCity");
    search(inputCity.value);
}

//Geo Location Button
function getLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherDetails);
}

function getGeoLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getLocation);
}

//Unit Conversion Button °F to °C
function getFahrenheitTemp(event) {
    event.preventDefault();

    tempButton.innerHTML = "°C";

    let temp = document.querySelector("#weather-temperature");
    temp.innerHTML = `${Math.round((celsiusTemp * 9) / 5 + 32)}°`;

    let feelsLikeTemp = document.querySelector("#feels-like");
    feelsLikeTemp.innerHTML = `${Math.round((celsiusFeelsLikeTemp * 9)/ 5 +32)} °`;
}

let apiKey = "248526705cf1e69e1604c72809dd3b61";
let celsiusTemp = null;

let form = document.querySelector("#change-city-form");
form.addEventListener("submit", changeCity);

let geoLocationButton = document.querySelector(".location-button");
geoLocationButton.addEventListener("click", getGeoLocation);

let tempButton = document.querySelector(".temperature-button");
tempButton.addEventListener("click", getFahrenheitTemp);

search("madrid");
