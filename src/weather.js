// Displays the current time and date
let now = new Date();

let timerID = document.querySelector("#timer");

let date = now.getDate();
let hours = now.getHours();
let twelve = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12;
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = "0" + minutes;
}

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday"
];
let day = days[now.getDay()];

timerID.innerHTML = `${date} ${day} ${hours}:${minutes} ${twelve}`;

// API call
function search(city) {
    let apiKey = "eaaeb210e95dc9ef485c92b37c060c09"
    let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    axios.get(Url).then(showWeather);
}


//Search ZipCode API
function displayZipCode(callBack) {
    callBack.preventDefaults();
    navigator.geolocation.getCurrentPosition(searchZipcode);
}

//function for ZipCode
function searchZipcode(zipcode) {
    let api = "eaaeb210e95dc9ef485c92b37c060c09"
    let Urls = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${api}`;

    axios.get(Urls).then(showWeather);

}


//Search Current Location
function displayCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

//The fucntion for searching current location
function searchCurrentLocation(position) {
    let apiKey = "eaaeb210e95dc9ef485c92b37c060c09"
    let Url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&appid=${apiKey}&lon=${position.coords.longitude}&units=imperial`;
    axios.get(Url).then(showWeather);
}


//Search cities using the search bar
function changeCity(event) {
    event.preventDefault();
    debugger;
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#searchCities").value
    let citySecond = document.querySelector("#secondCity")
    cityElement.innerHTML = cityInput.value;
    citySecond.innerHTML = cityInput.value;
    search(cityInput);
}
//Displays Weather
function showWeather(displayWeather) {
    let temperature = Math.round(displayWeather.data.main.temp);
    let WindyTemp = Math.round(displayWeather.data.wind.speed);
    let temperatureElement = document.querySelector("#deg");
    let description = document.querySelector("#tempDescript");
    let humidity = document.querySelector("#humid");
    let windElement = document.querySelector("#slowWind");
    let iconElement = document.querySelector("#icons");
    document.querySelector("#city").innerHTML = displayWeather.data.name;
    document.querySelector("#secondCity").innerHTML = `${displayWeather.data.name} `;

    temperatureElement.innerHTML = `${temperature}`;
    windElement.innerHTML = `Wind ${WindyTemp} mph`;
    humidity.innerHTML = `Humidity ${displayWeather.data.main.humidity}%`;
    description.innerHTML = displayWeather.data.weather[0].description;
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${displayWeather.data.weather[0].icon}@2x.png`);
}


let searchFrom = document.querySelector("#searchForm");
searchFrom.addEventListener("submit", changeCity);

let bulleyeButton = document.querySelector("#location");
bulleyeButton.addEventListener("click", displayCurrentLocation)

search("Atlanta");