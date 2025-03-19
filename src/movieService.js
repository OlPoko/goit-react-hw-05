import axios from "axios";

const API_KEY = "2e1dc8ff301cf7c2cd3bee5853eee132";

const fetchMovies = async (query, page = 1) => {
  const API_URL = "https://api.themoviedb.org/3/search/movie";
  try {
    const resp = await axios.get(API_URL, {
      params: {
        api_key: API_KEY,
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
    });
    return resp.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const fetchTrendingMovies = async () => {
  const TRENDING_API_URL = "https://api.themoviedb.org/3/trending/movie/day";
  try {
    const resp = await axios.get(TRENDING_API_URL, {
      params: {
        api_key: API_KEY,
      },
    });
    console.log("Trending movies response:", resp.data); // Лог для перевірки відповіді
    // Перевірка наявності results
    if (resp.data && Array.isArray(resp.data.results)) {
      return resp.data;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return []; // Повертає порожній масив у випадку помилки
  }
};

const fetchMovieDetails = async (movieId) => {
  const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}`;
  try {
    const resp = await axios.get(MOVIE_DETAILS_URL, {
      params: {
        api_key: API_KEY,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

const fetchMovieCast = async (movieId) => {
  const CAST_API_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  try {
    const resp = await axios.get(CAST_API_URL, {
      params: {
        api_key: API_KEY,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    return { cast: [] };
  }
};

const fetchMovieReviews = async (movieId) => {
  const REVIEWS_API_URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  try {
    const resp = await axios.get(REVIEWS_API_URL, {
      params: {
        api_key: API_KEY,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return { results: [] };
  }
};

export {
  fetchMovies,
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieReviews,
  fetchMovieCast,
};
