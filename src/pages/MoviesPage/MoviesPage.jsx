import React, { useState } from "react";
import { fetchMovies } from "../../movieService";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery) {
      const result = await fetchMovies(searchQuery);
      setMovies(result);
    }
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
