export interface VideoDetails {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string; // Use string for ISO date format, or you can use Date if you plan to parse it
  site: string;
  size: number;
  type: string;
}

export interface VideosData {
  results: VideoDetails[];
}
