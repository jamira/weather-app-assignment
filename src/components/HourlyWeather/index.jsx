import WeatherIcon from '../WeatherIcon';
import styles from './styles.module.scss'
import clsx from 'clsx';
import moment from 'moment';

const HourlyWeatherItem = ({ timestamp, iconCode, temp }) => {
    return (
        <div className={clsx(styles.hourlyWeather__item)}>
            <span className={styles.hourlyWeather__value}>{moment(timestamp).format('h:mm A')}</span>
            <WeatherIcon iconCode={iconCode} />
            <span className={styles.hourlyWeather__temp}>{`${temp}\u00b0`}</span>
        </div>
    )
}

const HourlyWeather = ({ hourlyWeather }) => {
    return (
        <>
            <div className='container section'>
                <h2 className='section__title'>Hourly forecast</h2>
                <div className={styles.hourlyWeatherItems}>
                    {hourlyWeather.map((props, index) => (
                        <HourlyWeatherItem key={index} {...props} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default HourlyWeather;