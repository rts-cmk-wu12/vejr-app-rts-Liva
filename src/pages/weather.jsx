import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import City from "../components/city";
import SearchedCities from "../components/searched-cities";

function WeatherPage() {
    const [searchedCities, setSearchedCities] = useState(null);
    const [city, setCity] = useState({});

    const API_KEY = import.meta.env.VITE_API_KEY;

    async function findCityCords(e) {
        e.preventDefault();

        const query = e.target.value;

        if (e.nativeEvent.data === ' ') {
            return;
        }

        if (query === '') {
            setSearchedCities(null);
            return;
        }

        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
        const data = await response.json();

        setSearchedCities(data);
        setCity({});
    }

    
    return (
        <>
            <header>
                <form className="form">
                    <label htmlFor="city" hidden>Search city</label>
                    <input type="text" name="city" className="form__input" placeholder="Search..." onInput={findCityCords} />
                    <button type="submit" className="form__btn"><IoMdSearch /></button>
                </form>
            </header>

            <main>
                {city?.id && <City city={city} />}
                {searchedCities?.length >= 1 && <SearchedCities cities={searchedCities} setCity={setCity} setSearchedCities={setSearchedCities} />}
                {searchedCities?.length < 1 && (
                    <p className="pre-message">No city found...</p>
                )}
                {searchedCities === null && (
                    <p className="pre-message">Weather data will appear here.<br />Just search for a city!</p>
                )}
            </main>
        </>
    );
}

export default WeatherPage;