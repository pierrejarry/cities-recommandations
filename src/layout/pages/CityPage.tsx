import { useLocation } from "react-router-dom"

function CityPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get('city');
    
    return (
        <div>CityPage: {city}</div>
    )
}

export default CityPage