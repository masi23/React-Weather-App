import React, {Component} from 'react';
import './App.css';
import Main from './Main';
import Aside from './Aside';

class App extends Component  {

  state = {
    inputCity: '',
    ballPosition: 20,
    aqiMeasurePositions: [10,25,50,50,75,90],
    aqiColor: '',
    popularWeather: [
      {
        city: "New York",
        id: 1,
        temperature: 12,
        description: "Rainy"
      },
      {
        city: "Paris",
        id: 2,
        temperature: 6,
        description: "Clouds"
      },
      {
        city: "Berlin",
        id: 3,
        temperature: 11,
        description: "Sunny"
      }]
  }

  connectApi = (city) => {
    const api = apiBase + apiKey + city + aqi;
    fetch(api)
      .then(response => {
        if(response.ok) {
          return response;
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.location.name != this.state.city) {
          this.setState({
            city: data.location.name,
            country: data.location.country,
            localTime: data.location.localtime,
            updated: data.current.last_updated,
            temperatureC: data.current.temp_c,
            temperatureF: data.current.temp_f,
            isDay: data.current.is_day,
            condition: data.current.condition.text,
            windSpeed: data.current.wind_kph,
            windDirection: data.current.wind_dir,
            pressure: data.current.pressure_mb,
            feelsLikeC: data.current.feelslike_c,
            feelsLikeF: data.current.feelslike_f,
            visibility: data.current.vis_km,
            humidity: data.current.humidity,
            pm2_5: data.current.air_quality.pm2_5.toFixed(2),
            ballPosition: this.state.aqiMeasurePositions[data.current.air_quality['us-epa-index'] -1],
            us_epa_index: data.current.air_quality['us-epa-index'],
            aqiColor: this.colorChose(data.current.air_quality['us-epa-index']),
        })
      }
    })
  }

  handleSubmit = inputCity => {
    this.setState({
      inputCity: inputCity
    })
    this.connectApi(inputCity);
    this.colorChose(this.state.us_epa_index);
  } 

  colorChose = (epa_index) => {
    let color = '';
    switch(epa_index) {
      case 1:
      case 2:
        color = 'blue';
        break;
      case 3:
      case 4:
        color = 'yellow';
        break;
      case 5:
      case 6:
        color = 'red';
        break;
    }
    return color
  }

  popularPlaces = () => {
    const popularCities = ["New%20York", "Rome", "Berlin"];
    const popularWeather = [];
    for(let i = 0; i < popularCities.length; i++) {
      fetch(apiBase + apiKey + popularCities[i])
        .then(response => {
          if(response.ok) {return response;}
        })
        .then(response => response.json())
        .then(data => 
          popularWeather[i] = {
            city: data.location.name,
            id: i,
            temperature: data.current.temp_c,
            description: data.current.condition.text  
          }
          )
    }
    this.setState({
      popularWeather: popularWeather
    })
  }

  componentDidMount() {
    this.popularPlaces();
    this.connectApi('London');
  }

  render() {
    const {city} = this.state;
    console.log(this.state);
    return (
      <div className='wrap-content'>
        <Main onSubmit={this.handleSubmit} state={this.state} />
        <Aside state={this.state}/>
      </div>
    )
  }
}

const apiBase = 'https://api.weatherapi.com/v1/current.json';
const apiKey = '?key=e681f513b6be4f4ca39213139222001&q=';
const aqi = '&aqi=yes';

export default App;