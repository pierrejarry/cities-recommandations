import { useEffect, JSX } from "react";
import { useLocation } from "react-router-dom"
import useRecommendations from "../../../hooks/useRecommendations";
import './CityPage.css';

function CityPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get('city');
    const { data: places, isLoading, error } = useRecommendations(city!);

    if (!city) {
        return (
            <main className="results">
                <h1>City not found</h1>
                <p>Please enter a valid city to explore recommendations.</p>
            </main>
        );
    }

    return (
        <main className="results">
            <h1>{city}</h1>
            <h2>Restaurants</h2>
            <p>Discover the best restaurants in town! From cozy cafés to fine dining experiences, explore a curated list of top places to eat in {city}. Enjoy delicious meals and unique flavors that make this city special.</p>
            
            {/* Loading */}
            {isLoading && <p>Loading results...</p>}
            
            {/* Error */}
            {error && <p>Error: {error.message}</p>}
            
            {/* Show Results */}
            {!isLoading && !error && (
                <section>
                    {places?.length ? (
                        <div className="restaurant-list">
                            {places.map((restaurant) => (
                                <div key={restaurant.fsq_id} className="restaurant-item">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="restaurant-image"
                                        width={300}
                                    />

                                    <div className="restaurant-item-content">
                                        <h3>{restaurant.name}</h3>

                                        <p>
                                            <strong>Category:</strong> {restaurant.categories[0]?.name || "Restaurant"}
                                        </p>
                                        <p>
                                            <strong>Address:</strong> {restaurant.location.address} {restaurant.location.locality} {restaurant.location.postcode}
                                        </p>

                                        <h4>Comments from the clients</h4>
                                        <ul>
                                            {restaurant.tips.map((tip, index) => (
                                                <li key={index}>{tip.text}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No restaurants found in {city}.</p>
                    )}

                </section>
            )}
        </main>
    )
}

export default CityPage