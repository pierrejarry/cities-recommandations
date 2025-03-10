import Search from "../../Search/Search";
import './SearchPage.css'

function SearchPage() {
    return (
        <main className="search-page">
            <header>
                <h1>Cities Recommendations</h1>
                <p>Search for a city below to get recommendations</p>
            </header>

            <section className="search-section" aria-labelledby="search-heading">
                <h2 id="search-heading" className="visually-hidden">City Search</h2>
                <Search />
            </section>
        </main>
    )
}

export default SearchPage