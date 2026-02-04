import React from "react";
import "../src/css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";
import MovieDetails from "./components/MovieDetails";
import TVShows from "./pages/TvShows";
import TvDetails from "./components/TVDetails";
import Section from "./pages/Section";

const App = () => {
  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Section/>} />
          <Route path="/movies" element={<Home/>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/tv/:id" element={<TvDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );
};

export default App;
