import React, { useState, useEffect } from "react";
import { getPopularMovies, getPopularTVShows } from "../services/api";
import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";
import "../css/Home.css";
import { useMovieContext } from "../contexts/MovieContext";

const Section = () => {
   const { favorites } = useMovieContext(); 
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  // const [favorites, setFavorites] = useState([]); // This will come from your local storage/state

  useEffect(() => {
    const loadData = async () => {
      const movies = await getPopularMovies();
      const tv = await getPopularTVShows();
      setPopularMovies(movies);
      setPopularTV(tv);

      // // Load favorites from localStorage if they exist
      // const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
      // setFavorites(savedFavs);
    };
    loadData();
  }, []);
  return (
    <div className="home-container">
      {/* 1. Banner Section */}
      <section className="banner" >
        <div className="banner-content">
          <h1>Explore Unlimited Movies & TV Shows</h1>
          <p>Track your favorites and discover what's trending now.</p>
          <button className="banner-btn">Watch Now</button>
        </div>
      </section>

      {/* 2. Popular Movies Section */}
      <section className="section-container">
        <h2>Popular Movies</h2>
        <div className="movies-grid">
          {popularMovies.slice(0, 5).map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </section>

      {/* 3. Popular TV Shows Section */}
      <section className="section-container">
        <h2>Trending TV Shows</h2>
        <div className="movies-grid">
          {popularTV.slice(0, 5).map((show) => (
            <TvCard tvShow={show} key={show.id} />
          ))}
        </div>
      </section>

      {/* 4. Favorite Movies Section */}
      <section className="section-container">



        <h2>Your Favorites</h2>
        {favorites.length > 0 ? (
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        ) : (
          <p className="empty-msg">
            No favorites added yet. Click the ❤️ to add some!
          </p>
        )}
      </section>
    </div>
  );
};





export default Section;
