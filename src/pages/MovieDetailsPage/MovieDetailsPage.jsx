import { useState, useEffect, useRef, Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { getMovieDetailsById } from "../../service/film-api.js";
import { BASE_POSTER_URL, PLACEHOLDER } from "../../utils/constants.js";
import { FaStepBackward } from "react-icons/fa";

import Loader from "../../components/Loader/Loader.jsx";

import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [currentMovie, setCurrentMovie] = useState({});
  const location = useLocation();

  const backLinkHref = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const currentMovieDetails = await getMovieDetailsById(movieId);
        setCurrentMovie(currentMovieDetails);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  const { poster_path, original_title, vote_average, overview, genres } =
    currentMovie;

  return (
    <>
      <Link to={backLinkHref.current} className={css["link-back"]}>
        <FaStepBackward />
        Back
      </Link>
      <section className={css["movie-wrapper"]}>
        <div className={css["main-information"]}>
          <img
            className={css["movie-poster"]}
            src={`${
              poster_path
                ? BASE_POSTER_URL + poster_path
                : PLACEHOLDER + "?text=" + original_title
            }`}
            alt="Movie poster"
          />
          <div className={css["movie-description"]}>
            <h2 className={css["main-title"]}>{original_title}</h2>
            <p className={css.rating}>
              User score: {Math.round(vote_average * 10)}%
            </p>
            <p className={css.subtitle}>Overview</p>
            <p className={css.overview}>{overview}</p>
            <p className={css.subtitle}>Genres</p>
            <p>{genres?.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
        <div>
          <p className={css["additional-title"]}>Additional information</p>
          <ul className={css["additional-information-list"]}>
            <li>
              <NavLink to="cast" className={buildLinkClass}>
                <span>Cast</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={buildLinkClass}>
                <span>Reviews</span>
              </NavLink>
            </li>
          </ul>

          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </section>
    </>
  );
}

export default MovieDetailsPage;
