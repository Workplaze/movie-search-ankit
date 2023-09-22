import React, { useContext } from "react";
import { ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Header from "./Components/Header";
import { ThemeContext } from "./Components/ContextApi/ThemeContext";
import UserData from "./Components/User/UserData";
import Client from "./Components/Apollo/Client";
import HomePage from "./Components/HomePage";

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={
        darkMode ? "bg-slate-100 text-black" : "bg-gray-800 text-white"
      }
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
