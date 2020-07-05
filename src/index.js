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

    celsiusFeelsLikeTemp = response.data.main.feels_like;

    let feelsLikeTemp = document.querySelector("#feels-like");
    feelsLikeTemp.innerHTML = `${Math.round(celsiusFeelsLikeTemp * 10) / 10} °`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;

    let date = document.querySelector("#date");
    date.innerHTML = formatDateTime(response.data.dt * 1000);

    let icon = document.querySelector("#icon-weather");
    icon.setAttribute("src",`icons/${response.data.weather[0].icon}.svg`);
    icon.setAttribute("alt", response.data.weather[0].description);

    //Forecast Api
    let latitude = response.data.coord.lat;
    let longitude = response.data.coord.lon;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecastDetails);
}

//City Forecast Details
function formatWeekDay(timestamp) {
    let date = new Date(timestamp);
    let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weekDay = weekDays[date.getDay()];
    return `${weekDay}`;
}

function displayForecastDetails(response) {
    let forecastContainer = document.querySelector("#forecast");
    forecastContainer.innerHTML = null;
    let forecast = null;

    for (let index = 1; index < 6; index++) {
        forecast = response.data.daily[index];
        let weekDay = formatWeekDay(forecast.dt * 1000);
        celsiusWeekDayMaxTemp = forecast.temp.max;
        celsiusWeekDayMinTemp = forecast.temp.min;

        forecastContainer.innerHTML += `
            <div class="week-day-container">
                <h6 class="week-day">${weekDay}</h6>
                <img class="icon" src="icons/${forecast.weather[0].icon}.svg" alt="${forecast.weather[0].description}" />
                <div class="week-day-temperature">
                <span class="week-day-max-temp">${Math.round(celsiusWeekDayMaxTemp)}°</span> | 
                <span class="week-day-min-temp">${Math.round(celsiusWeekDayMinTemp)}°</span>
                </div>
            </div>`
    }
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
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherDetails);

    //Forecast Api
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecastDetails);
}

function getGeoLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getLocation);
}

//Unit Conversion Button °F to °C
function getFahrenheitTemp() {
    fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    fahrenheitFeelsLikeTemp = (celsiusFeelsLikeTemp * 9) / 5 + 32;
    fahrenheitWeekDayMaxTemp = (celsiusWeekDayMaxTemp * 9) / 5 + 32;
    fahrenheitWeekDayMinTemp = (celsiusWeekDayMinTemp * 9) / 5 + 32;

    let temp = document.querySelector("#weather-temperature");
    temp.innerHTML = `${Math.round(fahrenheitTemp)}°`;

    let feelsLikeTemp = document.querySelector("#feels-like");
    feelsLikeTemp.innerHTML = `${Math.round(fahrenheitFeelsLikeTemp * 10) / 10} °`;

    let weekDayMaxTemp = document.querySelectorAll(".week-day-max-temp");
    weekDayMaxTemp.forEach(function(weekDayMaxTemp) {
    weekDayMaxTemp.innerHTML = `${Math.round(fahrenheitWeekDayMaxTemp)}°`;
    });

    let weekDayMinTemp = document.querySelectorAll(".week-day-min-temp");
    weekDayMinTemp.forEach(function(weekDayMinTemp) {
    weekDayMinTemp.innerHTML = `${Math.round(fahrenheitWeekDayMinTemp)}°`;
    });

    tempButton.innerHTML = "°C";
}

function getCelsiusTemp() {
    let temp = document.querySelector("#weather-temperature");
    temp.innerHTML = `${Math.round(celsiusTemp)}°`;

    let feelsLikeTemp = document.querySelector("#feels-like");
    feelsLikeTemp.innerHTML = `${Math.round(celsiusFeelsLikeTemp * 10) / 10} °`;

    let weekDayMaxTemp = document.querySelectorAll(".week-day-max-temp");
    weekDayMaxTemp.forEach(function(weekDayMaxTemp) {
    weekDayMaxTemp.innerHTML = `${Math.round(celsiusWeekDayMaxTemp)}°`;
    });

    let weekDayMinTemp = document.querySelectorAll(".week-day-min-temp");
    weekDayMinTemp.forEach(function(weekDayMinTemp) {
    weekDayMinTemp.innerHTML = `${Math.round(celsiusWeekDayMinTemp)}°`;
    });

    tempButton.innerHTML = "°F";
}

function convertUnits(event) {
    event.preventDefault();
    if(tempButton.innerHTML === "°C") {
      getCelsiusTemp();
    } else {
      getFahrenheitTemp();
    }
  }

let apiKey = "248526705cf1e69e1604c72809dd3b61";
let celsiusTemp = null;
let celsiusFeelsLikeTemp = null;
let celsiusWeekDayMaxTemp = null;
let celsiusWeekDayMinTemp = null;
let fahrenheitTemp = null;
let fahrenheitFeelsLikeTemp = null;
let fahrenheitWeekDayMaxTemp = null;
let fahrenheitWeekDayMinTemp = null;

let form = document.querySelector("#change-city-form");
form.addEventListener("submit", changeCity);

let geoLocationButton = document.querySelector(".location-button");
geoLocationButton.addEventListener("click", getGeoLocation);

let tempButton = document.querySelector(".temperature-button");
tempButton.addEventListener("click", convertUnits);

search("toronto");
