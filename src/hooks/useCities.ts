import { useQuery } from "@tanstack/react-query";

interface City {
    id: number;
    wikiDataId: string;
    type: string;
    city: string;
    name: string;
    country: string;
    countryCode: string;
    region: string;
    regionCode: string;
    regionWdId: string;
    latitude: number;
    longitude: number;
    population: number;
  };
  
 interface Link {
    rel: string;
    href: string;
  };
  
  interface Metadata {
    currentOffset: number;
    totalCount: number;
  };
  
  interface CityResponse {
    links: Link[];
    data: City[];
    metadata: Metadata;
  };
  

function useCities(searchTerm: string) {
    const fetchCities = async (searchTerm: string): Promise<CityResponse> => {
        const baseUrl = import.meta.env.VITE_CITIES_SEARCH_BASE_URL;
        const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;
        const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

        const response = await fetch(`${baseUrl}?namePrefix=${searchTerm}&minPopulation=100000&limit=10`, {
            headers: {
                'x-rapidapi-host': apiHost,
                'x-rapidapi-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cities');
        }

        const data = await response.json();
        console.log('data', data);
        return data;
    };

    const cityQuery = useQuery<CityResponse, Error>({
        queryKey: ['cities', searchTerm],
        queryFn: () => fetchCities(searchTerm),
        retry: 1,
    });

    return cityQuery;
}

export default useCities