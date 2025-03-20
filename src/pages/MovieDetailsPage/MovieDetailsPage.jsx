import React, { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../../movieService";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const backLinkRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loading)
    return <p className={css.loadingMessage}>Loading movie details...</p>;
  if (error) return <p className={css.errorMessage}>{error}</p>;

  const genres =
    movie.genres?.map((genre) => genre.name).join(", ") ||
    "No genres available";
  const userScore = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450";

  const goBack = () => navigate(backLinkRef.current);

  return (
    <div className={css.containerDetails}>
      <button className={css.backButton} onClick={goBack}>
        Go back
      </button>

      <div className={css.movieInfo}>
        <img src={posterPath} alt={movie.title} className={css.poster} />
        <div className={css.textInfo}>
          <h1 className={css.title}>{movie.title}</h1>
          <p className={css.overview}>{movie.overview}</p>
          <p className={css.genres}>
            <strong>Genres:</strong> {genres}
          </p>
          <p className={css.score}>
            <strong>User Score:</strong> {userScore}
          </p>
        </div>
      </div>

      <h3>Additional Information</h3>
      <ul className={css.links}>
        <li>
          <NavLink to="casts" state={{ from: backLinkRef.current }}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" state={{ from: backLinkRef.current }}>
            Reviews
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
