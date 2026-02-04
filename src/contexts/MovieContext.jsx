import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []); //It checks localStorage for any saved movies. If it finds them, it updates the state so your favorites don't disappear when you refresh the page.

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]); //The second useEffect has [favorites] as a dependency. Every time you add or remove a movie from the list, this hook runs and saves the updated list back to localStorage. This keeps the "browser's memory" in sync with your "app's state."

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId)); //Creates a brand new list that includes every movie except the one with the ID you clicked on.
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId); //Returns true or false. This is perfect for changing the heart icon from an outline (♡) to a solid (♥).
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
