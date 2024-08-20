import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { getMovieReviewsById } from "../../service/film-api.js";

import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [currentMovieReviews, setCurrentMovieReviews] = useState([]);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const movieReviews = await getMovieReviewsById(movieId);

        // Рефакторінг, як помилку виводити???
        if (movieReviews.length === 0)
          return <h3 className={css["no-reviews"]}>No reviews!</h3>;

        setCurrentMovieReviews(movieReviews);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieReviews();
  }, [movieId]);

  return (
    <>
      <ul className={css["reviews-list"]}>
        {currentMovieReviews.map(({ id, author, content }) => (
          <li key={id} className={css["reviews-item"]}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MovieReviews;
