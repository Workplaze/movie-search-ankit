import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ApolloProvider } from "@apollo/client";
import Client from "./Components/Apollo/Client";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./Components/ContextApi/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeContextProvider>
      <ApolloProvider client={Client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
    </ThemeContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
