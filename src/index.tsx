import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga";

ReactGA.initialize("UA-215919527-1"); // intialize Google Analytics to track site usage
ReactGA.pageview(window.location.pathname); // track page view

const container = document.getElementById("root");
if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>
);
