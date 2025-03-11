import { useQuery } from "@tanstack/react-query";
import { ApiResponse, PlaceResult, Tip } from "../utils/recommendationsTypes";

function useRecommendations(city: string) {
    const token = import.meta.env.VITE_FOURSQUARE_API_KEY;
    const baseUrl = import.meta.env.VITE_FOURSQUARE_BASE_URL;

    const fetchRestaurants = async (): Promise<PlaceResult[]> => {
        const searchUrl = `${baseUrl}/search?query=Restaurant&near=${city}&limit=10`;

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
                const tipsUrl = `${baseUrl}/${place.fsq_id}/tips`;
                const photosUrl = `${baseUrl}/${place.fsq_id}/photos`;

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
        queryFn: fetchRestaurants,
        retry: 1,
    });

    return cityQuery;
}

export default useRecommendations;