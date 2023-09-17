import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeContextProvider } from "./Components/ContextApi/ThemeContext";
import { ApolloProvider } from "@apollo/client";
import Client from "./Components/Apollo/Client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeContextProvider>
    <ApolloProvider client={Client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </ThemeContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
