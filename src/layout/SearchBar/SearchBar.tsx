import { useState } from "react";
import { X } from "lucide-react";
import './SearchBar.css'

function SearchBar() {
    const [city, setCity] = useState('');

    const handleCitySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    }

    const resetValue = () => {
        setCity('');
    }

    return (
        <form className="search-form" role="search">
            <label htmlFor="city-input" className="visually-hidden">Search for a city</label>
            <input 
                autoComplete="off" 
                id="city-input" 
                placeholder="Please enter the city" 
                type="text" 
                value={city} 
                onChange={handleCitySearch}
            />
            {city !== '' && 
                <button onClick={resetValue}>
                    <X color={`var(--dark-gray)`} />
                </button>
            }
        </form>
    )
}

export default SearchBar