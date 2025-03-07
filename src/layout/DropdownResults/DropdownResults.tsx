import './DropdownResults.css'
import useCities from '../../hooks/useCities'

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
                        <a href=''>
                            <strong>{city.name}</strong> - {city.country}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DropdownResults