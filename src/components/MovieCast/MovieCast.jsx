import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../movieService";
import css from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";
const DEFAULT_IMAGE = "https://via.placeholder.com/200x300?text=No+Image";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieCast() {
      try {
        const data = await fetchMovieCast(movieId);
        if (data && Array.isArray(data.cast)) {
          setCast(data.cast);
        } else {
          throw new Error("No cast data available");
        }
      } catch (error) {
        console.error("Error fetching movie cast:", error);
        setError("Failed to load cast information");
      }
    }
    getMovieCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>No cast available</p>;

  return (
    <div className={css.castContainer}>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${actor.profile_path}`
                  : DEFAULT_IMAGE
              }
              alt={actor.name}
              className={css.actorImage}
            />
            <p className={css.actorName}>{actor.name}</p>
            <p className={css.characterName}>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
