export interface Movie {
   adult: boolean;
   backdrop_path: string;
   genre_ids?: number[];
   id: number;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
}

export interface MovieDetails extends Movie {
   belongs_to_collection?: object;
   budget: number;
   genres: { id: number, name: string}[];
   homepage?: string;
   imdb_id?: string;
   production_companies: {name: string, id: number, logo_path?: string, origin_country: string}[];
   revenue: number;
   runtime: number;
   spoken_languages: { iso_639_1: string, name: string}[];
   tagline?: string;
   status: string;
}

export interface MoviesDto {
   page: number;
   results: Movie[];
   total_results: number;
   total_pages: number;
}

export interface MovieVideosDto {
   id: number;
   results: MovieVideo[]

}

export interface MovieVideo {
   iso_639_1: string;
   iso_3166_1: string;
   name: string;
   key: string;
   site: string;
   size: number;
   type: string;
   official: boolean;
   published_at: string;
   id: string;
}

