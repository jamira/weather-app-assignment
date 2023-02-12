import React, { useState, useContext } from 'react';
import styles from './styles.module.scss'
import useWeatherForecast from '../../hooks/useWeatherForecast';
import { ForecastContext } from '../../App';
const FilterWeather = () => {
    const pastDaysOptions = [{ text: 'Filter by Past days', value: 0 }, { text: '5 days ago', value: 5 }, { text: '1 week ago', value: 7 }, { text: '2 weeks ago', value: 14 }, { text: '1 month ago', value: 31 }, { text: '2 months ago', value: 61 }]

    const [daySelected, setDaySelected] = useState(null)
    const [isToggle, setIsToggle] = useState(false)

    const { submitPastDays } = useWeatherForecast()
    const { filterByDays } = useContext(ForecastContext)

    const onChangeForecast = (date) => {
        setDaySelected(date)
        filterByDays(date)
        setIsToggle(false)
    }

    const findTxt = pastDaysOptions.find(({ value }) => value === daySelected)

    return (
        <div className={styles.filterBox}>
            <div className={styles.filterBox__selected} onClick={() => setIsToggle(!isToggle)}>
                <span>{!daySelected ? 'Filter by Past days' : findTxt.text}</span>
            </div>
            {
                isToggle &&
                <ul className={styles.filterBox__options}>
                    {pastDaysOptions.map(({ text, value }, index) => (
                        <li key={index} onClick={() => onChangeForecast(value)}>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

export default FilterWeather;