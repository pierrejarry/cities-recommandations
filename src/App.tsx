import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

const SearchPage = lazy(() => import('./layout/pages/SearchPage'));
const CityPage = lazy(() => import('./layout/pages/CityPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<div>Loading...</div>}>
            <SearchPage />
          </Suspense>
        } />
        <Route path="/destination" element={
          <Suspense fallback={<div>Loading...</div>}>
            <CityPage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App