import React, { useContext } from "react";
import { ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Header from "./Components/Header";
import Introduction from "./Components/Introduction";
import MoviesFetch from "./Components/MoviesList/MoviesFetch";
import { ThemeContext } from "./Components/ContextApi/ThemeContext";
import UserData from "./Components/User/UserData";
import Client from "./Components/Apollo/Client";
import HomePage from "./Components/HomePage";

const App = () => {
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{ backgroundColor: theme.primary.main, color: theme.primary.text }}
    >
      <ApolloProvider client={Client}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userdata" element={<UserData />} />
        </Routes>
        <Header />
      </ApolloProvider>
    </div>
  );
};

export default App;
