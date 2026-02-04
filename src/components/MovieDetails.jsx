import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import "../css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams(); // ✅ get movie id from URL
  const [movie, setMovie] = useState(null); // ✅ store movie details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details",err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <p>{movie.overview}</p>

      <p>
        <strong>Release Year:</strong> {movie.release_date?.split("-")[0]}
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {movie.vote_average}
      </p>

      {/* Genres */}
      <div className="genres">
        <strong>Genres </strong>
        {movie.genres.map((genre) => (
          <span key={genre.id} className="genre">
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
