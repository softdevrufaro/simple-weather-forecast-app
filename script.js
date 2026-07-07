document.addEventListener("DOMContentLoaded", function () {
  //getting all the input data from the page
  const city = document.getElementById("city-input");
  const stateCode = document.getElementById("state-input");
  const country = document.getElementById("country-input");

  // getting the button
  const weatherBtn = document.getElementById("get-weather-btn");
  // setting up the output objects
  const weatherInfor = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  // declaring the API_KEY

  const API_KEY = ""; // put your API_KEY here. This is just to make sure the program runs but not a good programming practice.

  // listening for the click from the button
  weatherBtn.addEventListener("click", async () => {
    //fetching the city data from the geolocation API
    let loc_data = await fetchLocationData();
    if (loc_data === false) {
      errorMessage.classList.remove("hidden");
      weatherInfor.classList.add("hidden");
      cityName.textContent = "";
      temperature.textContent = "";
      description.textContent = "";
      return;
    }
    // getting the weather data
    const weatherData = await fetchWeather(loc_data);
    if (weatherData === false) return;
    // adding the information from the weatherData to the respective elements
    cityName.textContent = weatherData.cityname;
    temperature.textContent = `${weatherData.temperature} Kelvins`;
    description.textContent = weatherData.description;
    weatherInfor.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    // clearing the details that have been entered in the inputs
    /*city.value = "";
    stateCode.value = "";
    country.value = "";*/
  });

  async function fetchLocationData() {
    try {
      if (!country.value || !city.value || !stateCode.value) return false;
      const location_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value.trim()},${stateCode.value.trim()},${country.value.trim()}&limit=1&appid=${API_KEY}`;
      const location = await fetch(location_url);
      const locationData = await location.json();
      console.log(locationData.length);
      console.log(typeof locationData);
      console.log(locationData[0].lat);
      console.log(locationData[0].lon);
      console.log("Done");
      return [locationData[0].lat, locationData[0].lon];
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function fetchWeather(data) {
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0]}&lon=${data[1]}&appid=${API_KEY}`;
    try {
      const weather = await fetch(weather_url);
      const weatherdata = await weather.json();
      return {
        cityname: weatherdata.name,
        description: weatherdata.weather[0].description,
        temperature: weatherdata.main.temp,
      };
    } catch (error) {
      console.error(error);
      return false;
    }
  }
});
