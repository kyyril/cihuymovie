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
