import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

//images
export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOrigin = "https://image.tmdb.org/t/p/original";

//trending
export const fetchTrend = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );
  return data?.results;
};
