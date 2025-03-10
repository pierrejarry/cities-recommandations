import { useSearch } from "../../context/searchContext"
import SearchBar from "./SearchBar/SearchBar"
import DropdownResults from "./DropdownResults/DropdownResults"
import './Search.css'

function Search() {
    const { dropdownIsOpen } = useSearch();

    return (
        <div className="search">
            <SearchBar />
            {dropdownIsOpen &&
                <DropdownResults />
            }
        </div>
    )
}

export default Search