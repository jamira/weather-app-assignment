import React, { useState } from 'react';
import axios from 'axios';

const useWeatherForecast = () => {
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentWeather, setCurrentWeather] = useState({})
    const [dailyWeather, setDailyWeather] = useState([])
    const [hourlyWeather, setHourlyWeather] = useState([])
 
    let params = {
        latitude: null,
        longitude: null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }

    const fetchWeather = async (coordinates, past_days = 0) => {
        setIsLoading(true)

        const { lat, lng } = coordinates

        params.latitude = lat
        params.longitude = lng
        params.past_days = past_days
        
        try {
    
            if (lat !== null && lng !== null) {
                const { data } = await axios.get(import.meta.env.VITE_API_WEATHER, { params })
  
                return {
                    current: formattedCurrentWeather(data),
                    daily: formattedDailyWeather(data),
                    hourly: formattedHourlyWeather(data)
                }
            }

        } catch (error) {
            setIsError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const formattedCurrentWeather = ({ current_weather, daily }) => {
        const {
            temperature: currentTemp,
            weathercode: iconCode,
            windspeed: windSpeed
        } = current_weather

        const {
            temperature_2m_max: [maxTemp],
            temperature_2m_min: [minTemp],
        } = daily

        const newCurrentWeather = {
            currentTemp: Math.round(currentTemp),
            highTemp: Math.round(maxTemp),
            lowTemp: Math.round(minTemp),
            iconCode,
            windspeed: windSpeed
        }

        setCurrentWeather(currentWeather => ({
            ...currentWeather,
            ...newCurrentWeather
        }))
    }

    const formattedHourlyWeather = ({ hourly, current_weather }) => {
        const newHourlyWeather = hourly.time.map((time, index) => {
            return {
                timestamp: time * 1000,
                iconCode: hourly.weathercode[index],
                temp: Math.round(hourly.temperature_2m[index])
            }
        }).filter(({ timestamp }) => timestamp >= current_weather.time * 1000).splice(1, 8)

        setHourlyWeather(newHourlyWeather)
    }

    const formattedDailyWeather = ({ daily, hourly }) => {
        const newDailyWeather = daily.time.map((time, index) => {
            return {
                timestamp: time * 1000,
                iconCode: daily.weathercode[index],
                highTemp: Math.round(daily.temperature_2m_max[index]),
                lowTemp: Math.round(daily.temperature_2m_min[index]),
                rain: daily.rain_sum[index],
                sunrise: daily.sunrise[index],
                sunset: daily.sunset[index],
                windSpeed: Math.round(hourly.windspeed_10m[index])
            }
        })

        setDailyWeather(newDailyWeather)
    }

    return {
        isError,
        isLoading,
        fetchWeather,
        currentWeather,
        dailyWeather,
        hourlyWeather
    };
}

export default useWeatherForecast;