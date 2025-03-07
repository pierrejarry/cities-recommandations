import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchPage from './layout/pages/SearchPage'
import CityPage from './layout/pages/CityPage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/destination" element={<CityPage />} />
        </Routes>
    </BrowserRouter>
);
}

export default App