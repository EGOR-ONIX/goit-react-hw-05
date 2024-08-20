import axios from "axios";

const BASE_URL = "https://api.themoviedb.org";
const OPTIONS = new URLSearchParams({
  api_key: "8e426b5d56e7f63755d596f874a00f5b",
  Authorization:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTQyNmI1ZDU2ZTdmNjM3NTVkNTk2Zjg3NGEwMGY1YiIsIm5iZiI6MTcyMzg5Mzg2Ny42MDAzNDgsInN1YiI6IjY2YzA4NjZjY2NlNzA0ZWJlYWQzMjJjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._yseJFTUZ91DeWX4FWJFh0CGbYxQhfMBISWvXO6jB2A",
});

export const getTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/3/trending/movie/day?${OPTIONS.toString()}`
  );

  return response.data.results;
};

export const getMovieByQuery = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/3/search/movie?query=${query}&${OPTIONS.toString()}`
  );

  return response.data.results;
};

export const getMovieDetailsById = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/3/movie/${movieId}?${OPTIONS.toString()}`
  );

  return response.data;
};

export const getMovieCreditsById = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/3/movie/${movieId}/credits?${OPTIONS.toString()}`
  );

  return response.data.cast;
};

export const getMovieReviewsById = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/3/movie/${movieId}/reviews?${OPTIONS.toString()}`
  );

  return response.data.results;
};
