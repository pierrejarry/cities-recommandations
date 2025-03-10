import { useQuery } from "@tanstack/react-query";
import { ApiResponse, Place } from "../utils/recommendationsTypes";


interface Tip {
    id: string;
    created_at: string;
    text: string;
}

interface PlaceResult extends Place {
    tips: Tip[];
    image: string;
}



function useRecommendations(city: string) {
    const token = import.meta.env.VITE_FOURSQUARE_API_KEY;

    const fetchSightseeingSpots = async (): Promise<PlaceResult[]> => {
        const searchUrl = `https://api.foursquare.com/v3/places/search?query=Restaurant&near=${city}&limit=10`;

        // Fetch list of restaurants
        const searchResponse = await fetch(searchUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: token,
            },
        });

        if (!searchResponse.ok) {
            throw new Error(`HTTP error! Status: ${searchResponse.status}`);
        }

        const searchData: ApiResponse = await searchResponse.json();
        
        // Fetch details and images for each restaurant
        const places: PlaceResult[] = await Promise.all(
            searchData.results.map(async (place) => {
                const tipsUrl = `https://api.foursquare.com/v3/places/${place.fsq_id}/tips`;
                const photosUrl = `https://api.foursquare.com/v3/places/${place.fsq_id}/photos`;

                // Fetch restaurant details (description)
                const tipsResponse = await fetch(tipsUrl, {
                    headers: { Accept: "application/json", Authorization: token },
                });
                const tipsData: Tip[] = await tipsResponse.json();

                // Fetch restaurant images
                const photosResponse = await fetch(photosUrl, {
                    headers: { Accept: "application/json", Authorization: token },
                });
                const photosData = await photosResponse.json();

                return {
                    ...place,
                    tips: tipsData || [],
                    image: photosData.length > 0
                        ? `${photosData[0].prefix}original${photosData[0].suffix}`
                        : "https://via.placeholder.com/300",
                };
            })
        );

        return places;
    };

    const cityQuery = useQuery<PlaceResult[], Error>({
        queryKey: ["recommendations", city],
        queryFn: fetchSightseeingSpots,
        retry: 1,
    });

    return cityQuery;
}

export default useRecommendations;
