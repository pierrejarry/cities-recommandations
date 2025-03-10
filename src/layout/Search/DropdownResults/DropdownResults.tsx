import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSearch } from '../../../context/searchContext';
import useCities from '../../../hooks/useCities'
import Loading from '../../../components/Loading/Loading';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import './DropdownResults.css'

function DropdownResults() {
    const { 
        focusedIndex, 
        searchTerm, 
        setFocusedIndex,
        setDropdownIsOpen 
    } = useSearch();
    const { data, isLoading, error } = useCities(searchTerm);
    const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownIsOpen(false);
            }
        };

        // Add the event listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown') {
            data?.data && setFocusedIndex(Math.min(focusedIndex + 1, data?.data.length - 1));
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            focusedIndex === 0 ? setFocusedIndex(-1) : setFocusedIndex(Math.max(focusedIndex - 1, 0));
            e.preventDefault();
        } else if (e.key === 'Escape') {
            setFocusedIndex(-1);
        }
    };

    useEffect(() => {
        if (focusedIndex >= 0 && linkRefs.current[focusedIndex]) {
            linkRefs.current[focusedIndex]?.focus()
        }
    }, [focusedIndex, data])

    return (
        <div
            className="dropdown-results"
            role="listbox"
            aria-labelledby="search-heading"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            ref={dropdownRef}
        >
            {/* Loading */}
            {isLoading && <Loading />}

            {/* Error */}
            {!isLoading && error && <ErrorMessage text='Error loading cities' />}

            {/* No result */}
            {!isLoading && !data?.data?.length ?
                <p>No results found</p> :
                data?.data?.length &&
                <ul>
                    {data.data.map((city, index) => (
                        <li
                            key={city.city}
                            role="option"
                        >
                            <Link
                                to={`/destination?city=${city.name}`}
                                ref={el => {
                                    linkRefs.current[index] = el;
                                }}
                            >
                                <strong>{city.name}</strong> - {city.country}
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default DropdownResults