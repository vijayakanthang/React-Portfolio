import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import SmoothScrollEngine from "./components/SmoothScrollEngine";
import "./styles/base.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SmoothScrollEngine />
    <App />
  </StrictMode>,
);
