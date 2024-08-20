import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { getMovieReviewsById } from "../../service/film-api.js";

import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [currentMovieReviews, setCurrentMovieReviews] = useState([]);
  const [notReviews, setNotReviews] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setNotReviews(false);
        const movieReviews = await getMovieReviewsById(movieId);

        if (movieReviews.length === 0) {
          setNotReviews(true);
          return;
        }

        setCurrentMovieReviews(movieReviews);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieReviews();
  }, [movieId]);

  return notReviews ? (
    <h3 className={css["no-reviews"]}>No reviews!</h3>
  ) : (
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
