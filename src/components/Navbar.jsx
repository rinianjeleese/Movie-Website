import React from "react";
import { Link, Links } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-Links">
        <Link to="/" className="nav-link">
          Home{" "}
        </Link>
        <Link to="/movies">PopularMovies</Link>
         <Link to="/tvshows"> TV Shows </Link>
        <Link to="/favorites"> Favorites </Link>
       
      </div>
    </nav>
  );
};

export default Navbar;
