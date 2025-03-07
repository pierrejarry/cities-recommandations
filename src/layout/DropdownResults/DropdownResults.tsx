import './DropdownResults.css'
import useCities from '../../hooks/useCities'
import { Link } from 'react-router-dom';

function DropdownResults({ searchTerm }: { searchTerm: string }) {
    const { data, isLoading, error } = useCities(searchTerm);
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading cities</p>;
    if (!data?.data?.length) return <p>No results found</p>;
    
    return (
        <div
            className="dropdown-results"
            role="listbox"
            aria-labelledby="search-heading"
        >
            <ul>
                {data.data.map((city) => (
                    <li key={city.city} role="option">
                        <Link to={`destination?city=${city.name}`}>
                            <strong>{city.name}</strong> - {city.country}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DropdownResults