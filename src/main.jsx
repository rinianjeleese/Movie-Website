import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/css/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { MovieProvider } from "./contexts/MovieContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <App />
      </MovieProvider>
    </BrowserRouter>
  </StrictMode>,
);
