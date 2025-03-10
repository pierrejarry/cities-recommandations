interface Geocode {
    latitude: number;
    longitude: number;
}

interface Geocodes {
    main: Geocode;
    roof?: Geocode;
}

interface Category {
    id: number;
    name: string;
    short_name: string;
    plural_name: string;
    icon: {
        prefix: string;
        suffix: string;
    };
}

interface RelatedPlace {
    fsq_id: string;
    categories: Category[];
    name: string;
}

interface RelatedPlaces {
    parent?: RelatedPlace;
}

interface Location {
    address: string;
    admin_region: string;
    country: string;
    cross_street?: string;
    formatted_address: string;
    locality: string;
    postcode: string;
    region: string;
  }
  
export interface Place {
    fsq_id: string;
    categories: Category[];
    chains: any[];
    closed_bucket: string;
    distance: number;
    geocodes: Geocodes;
    link: string;
    location: Location;
    name: string;
    related_places: RelatedPlaces;
    timezone: string;
}

export interface ApiResponse {
    results: Place[];
}