import './DropdownResults.css'

function DropdownResults() {
    return (
        <div
            className="dropdown-results"
            role="listbox"
            aria-labelledby="search-heading"
        >
            <ul>
                <li role="option">
                    <a href=''>
                        <strong>New York</strong> - United States
                    </a>
                </li>
                <li role="option">
                    <a href=''>
                        <strong>New Delhi</strong> - India
                    </a>
                </li>
                <li role="option">
                    <a href=''>
                        <strong>New Orleans</strong> - United States
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default DropdownResults