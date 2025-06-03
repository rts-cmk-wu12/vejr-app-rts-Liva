import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

function WeatherPage() {
    const [city, setCity] = useState(null);

    const API_KEY = import.meta.env.VITE_API_KEY;

    async function searchWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city?.lat}&lon=${city?.lon}&appid=${API_KEY}&units=metric`);

        if (response.ok) {
            const data = await response.json();

            setCity(data);
        } else {
            setCity(undefined);
        }
    }

    async function findCityCords(e) {
        e.preventDefault();

        const query = e.target.city.value

        if (!query) {
            return
        }

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit15&appid=${API_KEY}`);
        const data = await response.json();

        searchWeather(data[0]);
    }

    return (
        <>
            <header>
                <form onSubmit={findCityCords} className="form">
                    <label htmlFor="city" hidden>Search city</label>
                    <input type="text" name="city" className="form__input" placeholder="Search..." />
                    <button type="submit" className="form__btn"><IoMdSearch /></button>
                </form>
            </header>

            <main>
                {city?.id && (
                    <section className="city">
                        <h1 className="city__name">{city?.name}</h1>
                        <img
                            src={`https://openweathermap.org/img/wn/${city?.weather[0]?.icon}@4x.png`}
                            alt="weather icon"
                            className="city__icon" />
                        <h2 className="city__temp">{city?.main?.temp.toFixed(0)}&#8451;</h2>
                        <p className="city__text">{city?.weather[0].description}</p>
                        <p className="city__text">feels like: {city?.main?.feels_like.toFixed(0)}&#8451;</p>
                        <div className="city__range">
                            <p className="city__text">max: {city?.main?.temp_max.toFixed(0)}&#8451;</p>
                            <p className="city__text">min: {city?.main?.temp_min.toFixed(0)}&#8451;</p>
                        </div>
                    </section>
                )}
                {city === undefined && (
                    <p className="error">No city found...</p>
                )}
                {city === null && (
                    <p className="error">Weather data will appear here.<br />Just search for a city!</p>
                )}
            </main>
        </>
    );
}

export default WeatherPage;