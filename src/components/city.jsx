import { useEffect, useState } from "react";
import { FaWater, FaWind } from "react-icons/fa";

function City({ city }) {
    const [forecasts, setForecasts] = useState([]);

    const API_KEY = import.meta.env.VITE_API_KEY;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDay() + 1;

    const months = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ];

    useEffect(() => {
        async function weatherForecasts() {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city?.coord?.lat}&lon=${city?.coord?.lon}&appid=${API_KEY}&units=metric`);

            if (response.ok) {
                const data = await response.json();

                setForecasts(data.list);
            }
        }

        weatherForecasts();
    }, [city]);

    function isRightDay(date) {
        const foreCastYear = Number(date.slice(0, 4));
        const foreCastMonth = Number(date.slice(5, 7));
        const foreCastDay = Number(date.slice(-2));

        if (currentYear === foreCastYear && currentMonth === foreCastMonth && currentDay === foreCastDay) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <section className="city">
            <h1 className="city__name">{city?.name}</h1>
            <img
                src={`https://openweathermap.org/img/wn/${city?.weather[0]?.icon}@4x.png`}
                alt="weather icon"
                className="city__icon" />
            <h2 className="city__temp">{city?.main?.temp.toFixed(0)}&#8451;</h2>
            <p className="city__text">{city?.weather[0]?.description}</p>
            <p className="city__text">feels like: {city?.main?.feels_like.toFixed(0)}&#8451;</p>
            <div className="city__range">
                <p className="city__text">max: {city?.main?.temp_max.toFixed(0)}&#8451;</p>
                <p className="city__text">min: {city?.main?.temp_min.toFixed(0)}&#8451;</p>
            </div>
            <div className="city__details">
                <div className="city__details-container">
                    <FaWater className="city__details-icon" />
                    <p className="city__text">{city?.main?.humidity}%<br />humidity</p>
                </div>
                <div className="city__details-container">
                    <FaWind className="city__details-icon" />
                    <p className="city__text  city__text--lower">{city?.wind?.speed}m/s<br />Wind Speed</p>
                </div>
            </div>
            <div className="city__forecast">
                <div className="city__range city__range--heading">
                    <p className="city__text">today</p>
                    <p className="city__text">{`${currentDay}, ${months[currentMonth - 1]}`}</p>
                </div>
                <div className="city__range">
                    {forecasts.map((forecast, index) => (
                        isRightDay(forecast.dt_txt.slice(0, 10)) && (
                            <div className="city__hour" key={index}>
                                <p className="city__text">{forecast?.main?.temp.toFixed(0)}&#8451;</p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${forecast?.weather[0]?.icon}@2x.png`}
                                    alt="forecast icon"
                                    className="city__forecast-icon" />
                                <p className="city__text">{forecast?.dt_txt.slice(11, -3)}</p>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
}

export default City;