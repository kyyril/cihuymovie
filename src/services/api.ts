import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

//images
export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOrigin = "https://image.tmdb.org/t/p/original";

//trending
export const fetchTrend = async (timeWindow = "week") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );
  return data?.results;
};

//detail movie/series
export const fetchDetailsMovie = async ({ type, id }: any) => {
  const { data } = await axios.get(
    `${baseUrl}/${type}/${id}?api_key=${apiKey}`
  );
  return data;
};

//credits
export const fetchCredits = async ({ type, id }: any) => {
  const { data } = await axios.get(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
  );
  return data;
};

//videos
export const fetchVideo = async ({ type, id }: any) => {
  const { data } = await axios.get(
    `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
  );
  return data;
};

//discover movie
export const fetchMovies = async (page: number, sortBy: string) => {
  const res = await axios.get(
    `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

//discover tv show
export const fetchTvShow = async (page: number, sortBy: string) => {
  const res = await axios.get(
    `${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

//search data
export const SearchData = async (query: string, page: number) => {
  const res = await axios.get(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
  );
  return res?.data;
};
