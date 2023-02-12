import React, { useState, createContext, useEffect } from 'react';
import SearchWeather from './components/SearchWeather';
import CurrentWeather from './components/CurrentWeather';
import HourlyWeather from './components/HourlyWeather';
import DailyWeather from './components/DailyWeather';
import useWeatherForecast from './hooks/useWeatherForecast';
import axios from 'axios';
import './App.scss';

export const ForecastContext = createContext();


function App() {
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({})
  const [pastDays, setPastDays] = useState(0)
  const [error, setError] = useState(false)
  const [isInvoke, setInvoke] = useState(false)
  
  const { isLoading, fetchWeather, currentWeather, hourlyWeather, dailyWeather } = useWeatherForecast()

  const fetchCoordinates = async (location) => {
    setInvoke(true)

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${import.meta.env.VITE_G_API_KEY}`)
      const coordinates = response.data.results[0].geometry.location
      const address = response.data.results[0].formatted_address

      if (address !== '') {
        setAddress(address)
      }

      if (coordinates.lat !== null && coordinates.lng !== null) {
        const newPosition = { lat: coordinates.lat, lng: coordinates.lng }
        setCoordinates(newPosition)
        fetchWeather(newPosition)
      }

    } catch (error) {
      setError(true)
    }
    
  }

  const filterByDays = (date) => {
    fetchWeather(coordinates, date)
    setPastDays(date)
  }

  useEffect(() => {
    const minute = 1000 * 60
    let interval
    
    if (isInvoke) {
      interval = setInterval(() => {
        fetchWeather(coordinates)
      }, minute)
    }

    return () => clearInterval(interval);
  }, [isInvoke])

  return (
    <div className='weatherApp'>
      <ForecastContext.Provider value={{ address, coordinates, filterByDays }}>
        <SearchWeather submitGeoLocation={fetchCoordinates} error={error} />
        <CurrentWeather currentWeather={currentWeather} />
          {hourlyWeather.length && dailyWeather.length ?
            <>
              <HourlyWeather hourlyWeather={hourlyWeather} />
              <DailyWeather dailyWeather={dailyWeather} />
            </>
            : <div className='noData container'>No data found</div>}
      </ForecastContext.Provider>
      { isLoading && <div className='loading'><p>Loading...</p></div>}
    </div>
  )
}

export default App
