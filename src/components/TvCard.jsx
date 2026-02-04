import React from "react";
import { useNavigate } from "react-router-dom"; // Import this
import "../css/MovieCard.css"; // Reusing your movie card CSS for consistency

function TvCard({ tvShow }) {
  const navigate = useNavigate(); // Initialize the navigate function

  // Helper for images
  const posterUrl = tvShow.poster_path
    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  // This function runs when the card is clicked
  const handleCardClick = () => {
    navigate(`/tv/${tvShow.id}`);
  };

  const onFavoriteClick = (e) => {
    e.stopPropagation(); // Stops the click from triggering handleCardClick
    // Add your favorite logic here later
    console.log("Added to favorites:", tvShow.name);
  };

  return (
    <div
      className="movie-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="movie-poster">
        <img src={posterUrl} alt={tvShow.name} />
        <div className="movie-overlay">
          <button className="favorite-btn" onClick={onFavoriteClick}>
            ❤️
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{tvShow.name}</h3>
        <p>{tvShow.first_air_date?.split("-")[0] || "N/A"}</p>
      </div>
    </div>
  );
}

export default TvCard;
