import React from 'react'
import WeatherApp from './components/WeatherApp'

const dataFetch= async(city)=>{
  const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc1534cd5fa9befd5a072a48eb3f3534`);
  const res= await response.json();
  // console.log(res.name);
  return res
}

const App = () => {
  return (
    <div>
      <WeatherApp dataFetch={dataFetch}/>
    </div>
  )
}

export default App