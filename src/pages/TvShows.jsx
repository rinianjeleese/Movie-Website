import React, { useState, useEffect } from "react";
import { getPopularTVShows, searchTVShows } from "../services/api";
import TvCard from "../components/TvCard";
import "../css/Home.css"; // Reusing your existing Home styles

function TVShows() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Load Popular Shows on initial mount
  useEffect(() => {
    loadPopularShows();
  }, []);

  const loadPopularShows = async () => {
    try {
      const popularShows = await getPopularTVShows();
      setTvShows(popularShows);
    } catch (err) {
      setError("Failed to load TV shows...");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchTVShows(searchQuery);
      setTvShows(searchResults);
    } catch (err) {
      setError("Search failed...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for TV shows..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {tvShows.map((show) => (
            <TvCard tvShow={show} key={show.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TVShows;
