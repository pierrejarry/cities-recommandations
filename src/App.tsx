import { useState } from "react";
import SearchBar from "./layout/SearchBar/SearchBar"
import DropdownResults from "./layout/DropdownResults/DropdownResults"
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <header>
        <h1>Cities Recommendations</h1>
        <p>Search for a city below to get recommendations</p>
    </header>

      <section className="search-section" aria-labelledby="search-heading">
        <h2 id="search-heading" className="visually-hidden">City Search</h2>
        <SearchBar onSearch={(city) => setSearchTerm(city)} />
        {searchTerm && <DropdownResults searchTerm={searchTerm} />}
      </section>
    </main>
  )
}

export default App