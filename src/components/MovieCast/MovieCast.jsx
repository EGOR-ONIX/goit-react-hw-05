import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { getMovieCreditsById } from "../../service/film-api.js";
import { BASE_POSTER_URL, PLACEHOLDER } from "../../utils/constants.js";

import css from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [currentMovieCast, setCurrentMovieCast] = useState([]);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        const movieCast = await getMovieCreditsById(movieId);
        setCurrentMovieCast(movieCast);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <ul className={css["cast-list"]}>
      {currentMovieCast.map(
        ({ id, profile_path, original_name, character }) => (
          <li key={id} className={css["cast-item"]}>
            <img
              src={`${
                profile_path
                  ? BASE_POSTER_URL + profile_path
                  : PLACEHOLDER + "?text=" + original_name
              }`}
              alt=""
            />
            <div className={css["actor-description"]}>
              <h3>{original_name}</h3>
              <p>Characters: {character}</p>
            </div>
          </li>
        )
      )}
    </ul>
  );
}

export default MovieCast;
