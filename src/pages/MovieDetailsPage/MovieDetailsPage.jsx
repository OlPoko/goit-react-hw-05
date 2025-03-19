import React, { useState, useEffect } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../../movieService";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        if (movieDetails) {
          setMovie(movieDetails);
        } else {
          setError("Movie details not found");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [movieId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;

  const genres =
    movie.genres?.map((genre) => genre.name).join(", ") ||
    "No genres available";
  const userScore = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450";

  const goBack = () => {
    navigate(location.state?.from ?? "/movies", { replace: true });
  };

  return (
    <div>
      <button className={css.backButton} onClick={goBack}>
        Go back
      </button>

      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Genres: {genres}</p>
      <p>User Score: {userScore}</p>
      <img
        src={posterPath}
        alt={movie.title}
        style={{ width: "300px", height: "auto", marginTop: "20px" }}
      />

      <ul>
        <li>
          <NavLink to="casts" state={{ from: location.state?.from ?? "/" }}>
            Casts
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" state={{ from: location.state?.from ?? "/" }}>
            Reviews
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
