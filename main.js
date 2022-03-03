let api = "dc9a27d59b894afaaf797823a3420c36";
let domLocation = document.getElementById("location");
let domDescription = document.getElementById("description");
let domTemperatureInCelcius = document.getElementById("temperatureInCelcius");
let domTemperatureInfahrenheit = document.getElementById(
    "temperatureInFahrenheit"
);
let domIconImg = document.getElementById("weather-icon");
let error = document.querySelector(".error");

//onLoad displays weather of current location

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        let longitude;
        let latitude;

        navigator.geolocation.getCurrentPosition((position) => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}&units=metric`;

            fetch(url)
                .then((response) => {
                    //console.log(response.json());
                    return response.json();
                })
                .then((data) => {
                    const place = data.name;
                    const country = data.sys.country;
                    const temp = data.main.temp;
                    const { description, icon } = data.weather[0];
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    domLocation.textContent = `${place} , ${country}`;
                    domDescription.textContent = description;
                    domTemperatureInCelcius.textContent = `${temp}°C`;
                    domTemperatureInfahrenheit.textContent = ` & ${fahrenheit.toFixed(2)}°F`;
                    domIconImg.src = iconUrl;
                    domIconImg.alt = `weather_icon`;
                });
        });
    }
});

//drop down
let main = document.getElementById("main");
let city = document.getElementById("city");
let zipCode = document.getElementById("zipCode");
let cityValue;
let zipValue;
let countryCode;

function displayOptions() {
    document.getElementById("cityBtn").style.display = "block";
    document.getElementById("zipBtn").style.display = "block";
    error.textContent = "";
}

function cityWeatherBtn() {
    main.style.display = "block";
    city.style.display = "block";
    zipCode.style.display = "none";
    error.textContent = "";
}

function zipWeatherBtn() {
    main.style.display = "block";
    zipCode.style.display = "block";
    city.style.display = "none";
    error.textContent = "";
}


document.getElementById("citySubmit").addEventListener("click", () => {
    cityValue = document.getElementById("cityInput").value;
    if (cityValue === "") {
        error.textContent = "Please enter a city Name";
    } else {
        cityWeather();
    }
});

function cityWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${api}`;

    fetch(url)
        .then((response) => {
            //console.log(response.json());
            return response.json();

        })
        .then((data) => {
            const status = data.message;
            if (status !== undefined) {
                error.textContent = status;
            }

            const place = data.name;
            const country = data.sys.country;
            const temp = data.main.temp;
            const { description, icon } = data.weather[0];
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const fahrenheit = (temp * 9) / 5 + 32;

            domLocation.textContent = `${place} , ${country}`;
            domDescription.textContent = description;
            domTemperatureInCelcius.textContent = `${temp}°C`;
            domTemperatureInfahrenheit.textContent = ` & ${fahrenheit.toFixed(2)}°F`;
            domIconImg.src = iconUrl;
            domIconImg.alt = `weather_icon`;
            error.textContent = "";

        })

}


document.getElementById("zipSubmit").addEventListener("click", () => {
    zipValue = document.getElementById("zipInput").value;
    countryCode = document.getElementById("countryCode").value;

    if (zipValue === "" && countryCode === "") {
        error.textContent = "Please check your details and try again!";
        console.log(error.textContent = "Please check your details and try again!")
    } else if (zipValue === "") {
        error.textContent = "Please enter a zip code!";
    } else if (countryCode === "") {
        error.textContent = "Please entry a country code!";
    } else {
        zipWeather();
        error.textContent = "";
        console.log(zipValue);
    }
});

function zipWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipValue},${countryCode}&appid=${api}`;

    fetch(url)
        .then((response) => {
            console.log(response)
            return response.json();
        })
        .then((data) => {
            const status = data.message;
            if (status !== undefined) {
                error.textContent = status;
            }

            const place = data.name;
            const country = data.sys.country;
            const temp = data.main.temp;
            const { description, icon } = data.weather[0];
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const fahrenheit = (temp * 9) / 5 + 32;

            domLocation.textContent = `${place} , ${country}`;
            domDescription.textContent = description;
            domTemperatureInCelcius.textContent = `${temp}°C`;
            domTemperatureInfahrenheit.textContent = ` & ${fahrenheit.toFixed(2)}°F`;
            domIconImg.src = iconUrl;
            domIconImg.alt = `weather_icon`;
        });
}
