import { Link } from "react-router";

function HomePage() {
    return (
        <main className="home">
            <img src="/logo.png" alt="logo" className="home__logo" />
            <h1 className="home__title">weather<span className="home__title--yellow">foreCasts</span></h1>
            <Link to='/weather' className="home__link">get started</Link>
        </main>
    );
}

export default HomePage;