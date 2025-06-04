import { FaWater, FaWind } from "react-icons/fa";

function City({ city }) {
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
        </section>
    );
}

export default City;