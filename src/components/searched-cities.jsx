function SearchedCities({ cities, setCity, setSearchedCities }) {
    const API_KEY = import.meta.env.VITE_API_KEY;

    async function searchWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city?.lat}&lon=${city?.lon}&appid=${API_KEY}&units=metric`);

        if (response.ok) {
            const data = await response.json();

            setCity(data);
            setSearchedCities(undefined);
        }
    }

    return (
        <div className="searched-cities">
            {cities.map((city, index) => (
                <section className="searched-city" key={index} onClick={() => searchWeather(city)}>
                    <h2 className="searched-city__name">{city?.name}</h2>
                    <p className="searched-city__text">{city?.country}</p>
                    {city?.state && <p className="searched-city__text">{city?.state}</p>}
                </section>
            ))}
        </div>
    );
}

export default SearchedCities;