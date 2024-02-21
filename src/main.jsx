import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Set localforage as a global variable for debugging
// import localforage from "localforage";
// window.localforage = localforage;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
