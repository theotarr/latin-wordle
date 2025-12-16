import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga";
import { ThemeProvider } from "./ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

ReactGA.initialize("UA-215919527-1"); // intialize Google Analytics to track site usage
ReactGA.pageview(window.location.pathname); // track page view

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
