import { useState, useEffect } from "react";
import { X } from "lucide-react";
import './SearchBar.css';

function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
    const [city, setCity] = useState('');

    const handleSearch = (e?: React.ChangeEvent<HTMLInputElement> | null) => {
        if (!e || e.target.value === '') {
            onSearch('');
        }
        
        e ? setCity(e.target.value) : setCity('');
    }

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
                onChange={handleSearch}
            />
            {city !== '' &&
                <button type="button" onClick={() => handleSearch()}>
                    <X color="var(--dark-gray)" />
                </button>
            }
        </form>
    );
}

export default SearchBar;
