import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Імпортуємо useNavigate
import { fetchMovies } from "../../movieService";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const navigate = useNavigate(); // Ініціалізуємо navigate
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchQuery = event.target.search.value.trim();
    setQuery(searchQuery);

    if (searchQuery) {
      try {
        const result = await fetchMovies(searchQuery);
        setMovies(result);
        setError(null);
      } catch (error) {
        setError("Failed to fetch movies.");
      }
    }
  };

  // Функція для повернення на попередню сторінку
  const goBack = () => {
    navigate(-1); // Повертає користувача на попередню сторінку
  };

  return (
    <div className={css.container}>
      <button onClick={goBack} className={css.goBackBtn}>
        Go back
      </button>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          name="search"
          placeholder="Search movies..."
          defaultValue={query}
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      {error && <p className={css.errorMessage}>{error}</p>}
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p className={css.noMoviesMessage}>No movies found.</p>
      )}
    </div>
  );
};

export default MoviesPage;
