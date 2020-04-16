import React, { useState } from 'react';
const api = {
  key: "222936ecfbe36af5aa6bc609fb05ef4c",
  base: "https://api.openweathermap.org/data/2.5/"
}
//`/forecast?appid=${API_KEY}&q=${city}`



function App() {


  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const isEmpty = (obj) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          // console.log(result);
        })
    }
  }



  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 289) ? 'app-warm' : 'app') : 'app'
    }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}

          />
        </div>
        {isEmpty(weather) === false && weather.cod === 200 ?
          <div>
            < div className="location-box">
              <div className="location">
                <p>{weather.name}, {weather.sys.country}</p>
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°K</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
          : <div className="error">
            <p>Ngga Nemu!!!</p>
          </div>}
      </main>
    </div >
  );
}

export default App;
