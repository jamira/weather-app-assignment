import WeatherIcon from "../WeatherIcon";
import styles from './styles.module.scss'
import clsx from "clsx";
import { ForecastContext } from "../../App";
import React, { useContext } from 'react';


const CurrentWeather = ({ currentWeather }) => {
    let description;
    const { currentTemp, highTemp, lowTemp, iconCode } = currentWeather
    const { address } = useContext(ForecastContext)

    return (

        <div className={styles.currentWeather}>
            <div className={clsx(styles.currentWeather__location, styles.currentWeather__meta)}>
                <h2>{address}</h2>
            </div>

            {currentTemp &&  (
                <div className={clsx(styles.currentWeather__temp, styles.currentWeather__meta)}>
                    <h2>{`${currentTemp}\u00b0`}</h2>
                </div>
            )}

            {highTemp && lowTemp && (
                <div className={clsx(styles.currentWeather__tide, styles.currentWeather__meta)}>
                    <span>{`H:${highTemp}\u00b0`}</span>
                    <span>{`L:${lowTemp}\u00b0`}</span>
                </div>
            )}
 
        </div>
    );
}

export default CurrentWeather;