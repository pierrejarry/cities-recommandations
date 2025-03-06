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
        <section className="search-bar">
            <input 
                type="text" 
                placeholder="Please enter the city" 
                value={city} 
                onChange={handleCitySearch}
            />
            {city !== '' && 
                <button onClick={resetValue}>
                    <X color={`var(--dark-gray)`} />
                </button>
            }
        </section>
    )
}

export default SearchBar