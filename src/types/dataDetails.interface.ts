interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number; // Assuming the genre has an ID
  name: string; // Assuming the genre has a name
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string; // Optional property for logo path
  origin_country?: string; // Optional property for origin country
}

interface ProductionCountry {
  iso_3166_1: string; // Country code
  name: string; // Country name
}

interface SpokenLanguage {
  iso_639_1: string; // Language code
  name: string; // Language name
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection | null; // Can be null if not part of a collection
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[]; // Array of country codes
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: any;
  first_air_date: any;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  name: string;
  original_name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
