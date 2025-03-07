import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useSearch } from "../../context/searchContext";
import './SearchBar.css';

function SearchBar() {
    const {focusedIndex, setFocusedIndex, setSearchTerm} = useSearch();
    const [city, setCity] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e?: React.ChangeEvent<HTMLInputElement> | null) => {
        if (!e || e.target.value === '') {
            setSearchTerm('');
        }
        
        e ? setCity(e.target.value) : setCity('');
    }

    const focusList = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            setFocusedIndex(0);
        }
    }

    useEffect(() => {
        if (!city) return;

        const timer = setTimeout(() => {
            setSearchTerm(city);
        }, 500);

        return () => clearTimeout(timer); // Clear the timeout if city changes again
    }, [city]);

    useEffect(() => {
        if (focusedIndex === -1 && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focusedIndex]);

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
                onKeyDown={focusList}
                ref={inputRef}
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
