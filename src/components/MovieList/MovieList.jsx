import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

import { BASE_POSTER_URL, PLACEHOLDER } from "../../utils/constants.js";

function MovieList({ moviesList }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {moviesList.map(({ id, original_title, poster_path }) => (
        <li className={css.item} key={id}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            <img
              src={`${
                poster_path
                  ? BASE_POSTER_URL + poster_path
                  : PLACEHOLDER + "?text=" + original_title
              }`}
              alt="Movie poster"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
