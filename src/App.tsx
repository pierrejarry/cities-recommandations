import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loading from './components/Loading/Loading';

const SearchPage = lazy(() => import('./layout/pages/SearchPage/SearchPage'));
const CityPage = lazy(() => import('./layout/pages/CityPage/CityPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<Loading />}>
            <SearchPage />
          </Suspense>
        } />
        <Route path="/destination" element={
          <Suspense fallback={<Loading />}>
            <CityPage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App