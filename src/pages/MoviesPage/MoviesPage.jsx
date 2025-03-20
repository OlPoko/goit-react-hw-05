import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../movieService";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchMovies(query);
        setMovies(result);
      } catch {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.search.value.trim();
    if (!searchQuery) return;
    setSearchParams({ query: searchQuery });
  };

  const goBack = () => navigate(-1);

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
      {loading && <p className={css.loadingMessage}>Loading...</p>}
      {!loading && movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        !loading && <p className={css.noMoviesMessage}>No movies found.</p>
      )}
    </div>
  );
};

export default MoviesPage;
