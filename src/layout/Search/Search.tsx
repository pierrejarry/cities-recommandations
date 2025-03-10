import { useSearch } from "../../context/searchContext"
import SearchBar from "./SearchBar/SearchBar"
import DropdownResults from "./DropdownResults/DropdownResults"
import './Search.css'

function Search() {
    const { searchTerm } = useSearch();
    const searchTermIsValid = searchTerm !== '';

    return (
        <div className="search">
            <SearchBar />
            {searchTermIsValid &&
                <DropdownResults />
            }
        </div>
    )
}

export default Search