<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity" class="search-button">Search</button>
        <div v-if="cityWeatherData">
          <h2>
            {{ cityWeatherData.name }}
          </h2>
          <div>
            <img :src="cityiconurl" alt="your searched city weather icon" />
            <p>{{ citytemperature }} °C</p>
          </div>
          <span>{{ cityWeatherData.weather[0].description }}</span>
        </div>
      </div>
    </div>
    <main>
      <!-- if there're no data returned, then skip rendering the information -->
      <div v-if="weatherData">
        <!-- display the weather data attribute returned from API -->
        <!-- Example of API data: https://openweathermap.org/current -->
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div>
          <!-- the image source of the weather icon will be coming from a function called iconUrl -->
          <!-- which will be shared in scipt later  -->
          <!-- : -> shorthand of v-bind -->
          <!-- alt -> alternative text for the image -->
          <img :src="iconUrl" alt="weather icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <!-- weather[0] means the current weather, the way we need to obtain data 
      depends on how the API JSON data looks like -->
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
  <!-- The <main> tag in HTML is used to specify the main content of a document -->
  <!-- More info about main, check https://www.w3schools.com/tags/tag_main.asp -->

</template>

<script>
import axios from 'axios';

const apikey = import.meta.env.VITE_OPENWEATHER_APIKEY;

export default {
  name: 'app',
  data() {
    return {
      city: '',
      weatherData: null,
      cityWeatherData: null,
      hourlyForecase: [],
      dailyForecast: []
    }
  },
  //computed is a property that's used to define a property that's dependent on other data properties.
  //the derived value such as temperature automatically update when the relevant value change
  computed: {
    //there are multiple ways to obtain data in Celsius format摄氏度
    //calculation by yourself like below after data is retrieved or via API parameters

    //Example of adding additional units requirement, if you choose this, remember to change <template> code
    //https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null
    },
    //get current weather icon using API link
    iconUrl() {
      return this.weatherData
        ? `https://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    },
    cityiconurl() {
      return this.cityWeatherData
        ? `https://api.openweathermap.org/img/w/${this.cityWeatherData.weather[0].icon}.png`
        : null
    },
    citytemperature() {
      return this.cityWeatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null
    }
  },
  //there're two steps involved here
  //1.identify current location
  //2.get weather data staright based on the current location after identify
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    //Async -> means methd will run in backend thread
    //it won't occupy the main thread, so the user experience is still smooth
    async fetchCurrentLocationWeather() {
      //navigator.geolocation object is part of the web API provided by modern web browsers
      //this function is not belongs to vue or openweather
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          //api link to obtain current weather based on current location browser identified
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          //await means wait for the fetchWeatherData method to complete before proceed
          await this.fetchWeatherData(url)
        })
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        //returned data from API is stored as JSON file in weatherData
        this.weatherData = response.data
      } catch (error) {
        console.log('error fetching weather data:', error)
      }
    },
    async searchByCity() {
      const cityurl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.trim()}&appid=${apikey}`;
      await this.fetchCityWeatherData(cityurl);
    },
    async fetchCityWeatherData(cityurl) {
      try {
        const res = await axios.get(cityurl)
        this.cityWeatherData = res.data
      } catch (e) {
        console.log('error fetching search city data')
      }
    }
  }
}
</script>