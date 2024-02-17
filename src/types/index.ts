export type BaseListQueryParams = {
  page?: number;
};

export type CommonListResponse = {
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieListItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TVShowsListItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: Date;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type PopularMovieListResponse = CommonListResponse & {
  results: MovieListItem[];
};

export type PopularTVShowsListResponse = CommonListResponse & {
  results: TVShowsListItem[];
};
