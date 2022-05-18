import './App.css';
import axios from 'axios';
import { useState } from 'react'

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=db2113f930cf4ac5cf0522cf1d12f2c5`;

  const SearchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
    }

  }

  return (
    <div className="app">
      <section className='Content'>

        <div className='SearchBar'>
          <input type="text" 
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder= "Enter Location"
          onKeyPress={SearchLocation}/>
        </div>

        <div className='Top'>
          {data ? <h3 className='CityName'>{data.name}</h3> : null}
          {data.main ? <h1 className='CityTemperature'>{Math.round(data.main.temp)}°C</h1> : null}
          {data.weather ? <h3 className='CityWeatherDescription'>{data.weather[0].main}</h3> : null}
        </div>

        {data.main ? <div className='Bottom'>
         
            <div className='BottomItem'>
              <h4>Humidty</h4>
              {data.main ? <h4 className='bold'>{data.main.humidity}%</h4> : null}
            </div>
            <div className='BottomItem CenterItem'>
              <h4>feels like</h4>
              {data.main ? <h4 className='bold'>{Math.round(data.main.feels_like)}°C</h4> : null}
            </div>
            <div className='BottomItem'>
              <h4>Wind</h4>
              {data.wind ? <h4 className='bold'>{Math.round(data.wind.speed)}KPH</h4> : null}
            </div>
        </div> : null}

      </section>
    </div>
  );
}

export default App;
