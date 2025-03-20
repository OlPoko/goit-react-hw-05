import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../movieService";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const data = await fetchTrendingMovies();
        console.log("Fetched trending movies:", data);

        if (data && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Failed to load trending movies");
      } finally {
        setLoading(false);
      }
    }

    getTrendingMovies();
  }, []);

  return (
    <div className={css.containerHomePage}>
      <h1 className={css.pHomePage}>Trending Movies Today</h1>
      {error ? (
        <p className={css.error}>{error}</p>
      ) : loading ? (
        <p className={css.loading}>Loading...</p>
      ) : movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p className={css.noMovies}>
          No trending movies available at the moment.
        </p>
      )}
    </div>
  );
};

export default HomePage;
