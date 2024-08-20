import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loader from "../../components/Loader/Loader";

import { getMovieByQuery } from "../../service/film-api.js";

import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams("");

  const currentQuery = searchParams.get("query");

  useEffect(() => {
    if (!currentQuery) return;

    const fetchMovieByQuery = async () => {
      try {
        setMoviesList([]);
        setNotFoundMovies(false);
        setIsLoading(true);

        const moviesByQuery = await getMovieByQuery(currentQuery);

        if (moviesByQuery.length === 0) {
          setNotFoundMovies(true);
          return;
        }

        setMoviesList(moviesByQuery);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieByQuery();
  }, [currentQuery, searchParams]);

  return (
    <>
      <SearchForm
        defaultQuery={currentQuery}
        setSearchParams={setSearchParams}
      />
      {moviesList.length !== 0 && <MovieList moviesList={moviesList} />}
      {notFoundMovies && (
        <h2 className={css["no-movies"]}>
          There is no movie for your request. Try again!
        </h2>
      )}
      {isLoading && <Loader />}
    </>
  );
}

export default MoviesPage;
