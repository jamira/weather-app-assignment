import styles from './styles.module.scss'
import clsx from 'clsx';
import moment from 'moment';
import WeatherIcon from '../WeatherIcon';
import FilterWeather from '../FilterWeather'

const DailyWeatherItem = ({ timestamp, iconCode, highTemp, lowTemp, rain, sunset }) => {
    return (
        <div className={clsx(styles.dailyWeather__item)}>
            <div className={clsx(styles.dailyWeather__item__date, styles.dailyWeather__meta)}>
                <span>{moment(timestamp).format('ddd')}</span>
                <span>{moment(timestamp).format('DD/MM')}</span>
            </div>
            <div className={clsx(styles.dailyWeather__item__icon, styles.dailyWeather__meta)}>
                <WeatherIcon iconCode={iconCode} />
            </div>
            <div className={clsx(styles.dailyWeather__item__low, styles.dailyWeather__meta)}>
                <span>{`${lowTemp}\u00b0`}</span>
                <span>Low</span>
            </div>
            <div className={clsx(styles.dailyWeather__item__high, styles.dailyWeather__meta)}>
                <span>{`${highTemp}\u00b0`}</span>
                <span>High</span>
            </div>
            <div className={clsx(styles.dailyWeather__item__rain, styles.dailyWeather__meta)}>
                <span>{`${rain}\u0025`}</span>
                <span>Rain</span>
            </div>
            <div className={clsx(styles.dailyWeather__item__rain, styles.dailyWeather__meta)}>
                <span>{moment(sunset).format('h:mm A')}</span>
                <span>Sunset</span>
            </div>
        </div>
    );
}

const DailyWeather = ({ dailyWeather }) => {
    return (
        <div className='container section'>
            <div className={styles.filterBoxWrap}>
                <h2 className='section__title'>Daily forecasts</h2>
                <FilterWeather />
            </div>
            <div className={styles.dailyWeather}>
                {dailyWeather.map((props, index) => (
                    <DailyWeatherItem key={index} {...props} />
                ))}
            </div>
        </div>
    )
}

export default DailyWeather;