import React, { useState } from 'react'

const WeatherApp = ({ dataFetch: dataFetch }) => {
    //   useEffect(() => {
    //   }, []);
  
    const [city, setCity] = useState({ name: "" });
    const handleCity = (e) => {
      setCity((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    };
  
    const [datas, setDatas] = useState({
      data: {
        cityName: null,
        main: null,
        humidity: null,
        winSpeed: null,
        temperature: null,
      },
      loading: {
          load:false,
      },
    });
  
    const searchBtn = async () => {
        setDatas((pre) => ({ ...pre, loading:{
          load:true
        } }));
        console.log(datas.loading.load);
  
      const weatherData = await dataFetch(city.name);
  
      // console.log(datas.data.loading)
      // console.log(weatherData);
  
      const main = await weatherData.weather[0].main;
      const humidity = await weatherData.main.humidity;
      const winSpeed = await weatherData.wind.speed;
      const temperature = await weatherData.main.temp;
      setDatas((pre) => ({
        ...pre,
        loading: {
          load:false
        },
        data: {
          cityName: weatherData.name,
          main: main,
          humidity: humidity,
          winSpeed: winSpeed,
          temperature: parseInt(temperature - 273.15),
        },
      }));
      console.log(datas.loading.load)
      return weatherData;
    };
  
    return (
      <div className="h-screen  ">
        <div className=" max-[550px]:h-screen max-[550px]:w-full w-96 shadow-2xl shadow-black bg-gradient-to-tl from-indigo-500 to-pink-500 h-[400px] mx-auto rounded-2xl flex flex-col">
          <div className="flex flex-row max-[550px]:flex-col  mx-auto my-5 gap-3">
            <div className="rounded-xl">
              <input
                //   leading-tight/
                className="rounded-xl px-4 py-2"
                placeholder="Enter Location"
                type="text"
                value={city.name}
                name="name"
                onChange={handleCity}
              />
            </div>
            <button
              onClick={searchBtn}
              className="  shadow-lg text-white shadow-cyan-500/50  bg-gradient-to-tl from-green-400 to-yellow-500 px-4 py-2 rounded-2xl active:bg-yellow-800 select-none active:text-white "
            >
              Search
            </button>
          </div>
  
          <div className=" flex flex-col items-center space-y-10 mt-8">
            <h1 className=" text-blue-400 text-2xl">{datas.data.cityName}</h1>
            <h1 className=" text-blue-400 text-2xl">
              {datas.data.temperature} °C
            </h1>
  
            <h1 className=" text-white text-xl">{datas.data.main}</h1>
  
            <div className=" flex flex-row gap-10">
              <div>
                <h2 className="text-m text-blue-800">{datas.data.humidity}%</h2>
                <p className=" text-sm text-green-500">Hummidity</p>
              </div>
              <div>
                <h1 className="text-m text-blue-800">
                  {datas.data.winSpeed}km/h
                </h1>
                <p className=" text-sm text-green-500">Wind Speed</p>
              </div>
            </div>
          </div>
  
          </div>
  
         
        </div>
    );
  };
  

export default WeatherApp