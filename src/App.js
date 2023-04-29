import React, { Component } from 'react';
import './App.css';

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.API = {
      key: "38f4667f8a2f51bdff0575d28315049c",
      base: "http://api.openweathermap.org/data/2.5/"
    };
    this.state = {
      query: "",
      weather: {}
    };
  }

  dataBuild(d) {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  }

  search = (e) => {
    if (e.key === "Enter") {
      fetch(`${this.API.base}weather?q=${this.state.query}&units=metric&appid=${this.API.key}`)
        .then((res) => res.json())
        .then((results) => {
          this.setState({
            query: "",
            weather: results
          });
          console.log(results);
        })
    }
  }

  renderWeather() {
    const { weather } = this.state;
    return (
      <div>
        <div className="location-contanier">
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="date">{this.dataBuild(new Date())}</div>
        </div>
        <div className="weather-container">
          <div className="temperature">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className='weather'>{weather.weather[0].main}</div>
        </div>
      </div>
    );
  }

  render() {
    const { weather } = this.state;
    return (
      <div className={
        typeof weather.main !== "undefined" ? weather.main.temp > 18 > 14 ? "App hot" : "App cold" : "App rain"
      }>
        <main>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
              onChange={(e) => this.setState({ query: e.target.value })}
              value={this.state.query}
              onKeyPress={this.search}
            />
          </div>
          {typeof weather.main !== "undefined" ? this.renderWeather() : ""}
        </main>
      </div>
    );
  }
}

export default WeatherApp;
