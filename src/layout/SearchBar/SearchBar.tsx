import { useState, useEffect } from "react";
import { X } from "lucide-react";
import './SearchBar.css';

function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
    const [city, setCity] = useState('');

    useEffect(() => {
        if (!city) return;

        const timer = setTimeout(() => {
            onSearch(city);
        }, 500);

        return () => clearTimeout(timer); // Clear the timeout if city changes again
    }, [city]);

    return (
        <form className="search-form" role="search">
            <label htmlFor="city-input" className="visually-hidden">Search for a city</label>
            <input
                autoComplete="off"
                id="city-input"
                placeholder="Please enter the city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            {city !== '' &&
                <button type="button" onClick={() => setCity('')}>
                    <X color="var(--dark-gray)" />
                </button>
            }
        </form>
    );
}

export default SearchBar;
