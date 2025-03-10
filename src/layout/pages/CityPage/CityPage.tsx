import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSearch } from "../../../context/searchContext";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import Loading from "../../../components/Loading/Loading";
import Search from "../../Search/Search";
import ListItem from "./ListItem";
import useRecommendations from "../../../hooks/useRecommendations";
import './CityPage.css';

function CityPage() {
    const location = useLocation();
    const { setSearchTerm, setDropdownIsOpen } = useSearch();
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get('city');
    const { data: places, isLoading, error } = useRecommendations(city!);


    useEffect(() => {
        setSearchTerm('');
        setDropdownIsOpen(false);
    }, [city]);

    if (!city) {
        return (
            <main className="results">
                <h1>City not found</h1>
                <p>Please enter a valid city to explore recommendations.</p>
            </main>
        );
    }

    return (
        <>
            <header>
                Find a city:
                <Search />
            </header>
            <main className="results">
                <h1>{city}</h1>
                <h2>Restaurants</h2>
                <p>Discover the best restaurants in town! From cozy cafés to fine dining experiences, explore a curated list of top places to eat in {city}. Enjoy delicious meals and unique flavors that make this city special.</p>

                {/* Loading */}
                {isLoading && 
                    <Loading text="Loading results" />
                }

                {/* Error */}
                {error && 
                    <ErrorMessage text={`Error: ${error.message}`} /> 
                }

                {/* Show Results */}
                {!isLoading && !error && (
                    <section>
                        {places?.length ? (
                            <div className="restaurant-list">
                                {places.map((restaurant) => (
                                    <ListItem
                                        key={restaurant.fsq_id}
                                        image={restaurant.image}
                                        name={restaurant.name}
                                        category={restaurant.categories[0]?.name || "Restaurant"}
                                        address={`${restaurant.location.address} ${restaurant.location.locality} ${restaurant.location.postcode}`}
                                        tips={restaurant.tips}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No restaurants found in {city}.</p>
                        )}

                    </section>
                )}
            </main>
        </>
    )
}

export default CityPage