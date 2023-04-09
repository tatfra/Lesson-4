import "./styles.css";
//Show Date
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "Mars",
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
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let date = now.getDate();
console.log(day);
console.log(hour);
console.log(minutes);
console.log(month);

let year = now.getFullYear();

let fullDate = document.querySelector("p#month-date");
fullDate.innerHTML = `${year} ${month}, ${date}`;

let dayTime = document.querySelector("p#day-time");
dayTime.innerHTML = `${day}, ${hour}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-information").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "21eea3638bfada0d7c0b605eac8f5457";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-output").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "21eea3638bfada0d7c0b605eac8f5457";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-city");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
