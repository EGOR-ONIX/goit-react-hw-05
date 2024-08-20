import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../service/film-api.js";

import MovieList from "../../components/MovieList/MovieList";

import css from "./HomePage.module.css";

function HomePage() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingMoviesList = await getTrendingMovies();
        setMoviesList(trendingMoviesList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      <MovieList moviesList={moviesList} />
    </>
  );
}

export default HomePage;
