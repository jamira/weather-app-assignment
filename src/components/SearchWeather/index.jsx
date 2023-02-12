import React, { useState, useContext } from 'react';
import styles from './styles.module.scss'

const SearchWeather = ({ error, submitGeoLocation }) => {
    const [location, setLocation] = useState('')   
         
    const handleClick = (e) => {
        e.preventDefault()
        if (!location.length) return
        submitGeoLocation(location)
        setLocation('')
    }

    return (
        <div className={styles.searchWeather}>
            <div className={styles.searchWeather__inner}>
                <h2 className={styles.searchWeather__title}>What's the weather?</h2>
                <form onSubmit={handleClick} className={styles.searchWeather__form}>
                    <input
                        className={styles.searchWeather__form__input}
                        type="text"
                        placeholder="Search for a city or airport..."
                        value={location}
                        onChange={e => setLocation(e.target.value)} />
                    <button
                        className={styles.searchWeather__form__button}
                        type="submit"
                    >Search</button>
                </form>
                {error && <div className={styles.searchWeather__error}>Couldn't fetch data. Please try again</div> }
            </div>
        </div>
    );
}

export default SearchWeather;