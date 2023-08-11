// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
const api = {
  key: '870d162591bfb9671acd39b64f76136a',
  base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {

  const [query, setquery] = useState('');
  const [weather, setweather] = useState('');
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setweather(result)
          setquery('')
          console.log(result);
        });
    }
  }


  const dateBuilder = (props) => {
    let months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

    const dates = new Date();
    let day = days[props.getDay()];
    let date = dates.getDate();
    let month = months[props.getMonth()];
    let year = dates.getFullYear();


    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined")?
    ((weather.main.temp>19)?'app warn' :'app' ):'app'}>
      <main>
        
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={e => setquery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name},{weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {weather.main.temp}°c
                {/* Humidity : {weather.main.humidity} */}
                
              </div>
              <div className='weather'>
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>

    </div>
  );
}

export default App;
