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
  
  export interface CityResponse {
    links: Link[];
    data: City[];
    metadata: Metadata;
  };