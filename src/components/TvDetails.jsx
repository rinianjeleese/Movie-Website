import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTVShowDetails } from "../services/api";
import "../css/MovieCard.css"; // You can create a specific TvDetails.css for better styling
import "../css/TvDetails.css";

function TvDetails() {
  const { id } = useParams(); // Gets the ID from the URL (/tv/:id)
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getTVShowDetails(id);
        setTvShow(data);
      } catch (error) {
        console.error("Error fetching TV details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading details...</div>;
  if (!tvShow) return <div className="error">Show not found!</div>;

  return (
    <div className="tv-details-container">
      {/* Background Banner */}
      <div
        className="details-banner"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%), url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`,
        }}
      >
        <div className="details-content">
          <div className="details-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
            />
          </div>

          <div className="details-text">
            <h1>{tvShow.name}</h1>
            <div className="details-meta">
              <span>{tvShow.first_air_date?.split("-")[0]}</span>
              <span> • </span>
              <span>{tvShow.number_of_seasons} Seasons</span>
              <span> • </span>
              <span className="rating">
                ⭐ {tvShow.vote_average.toFixed(1)}
              </span>
            </div>

            <p className="tagline">
              <i>{tvShow.tagline}</i>
            </p>

            <h3>Overview</h3>
            <p className="overview">{tvShow.overview}</p>

            <div className="genres">
              {tvShow.genres?.map((genre) => (
                <span key={genre.id} className="genre-badge">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TvDetails;
