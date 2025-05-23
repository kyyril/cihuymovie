export interface WatchlistItem {
  id: number;
  overview: string;
  poster_path: string;
  releaseDate: string;
  title: string;
  type: "movie" | "tv";
  voteAverage: number;
}
