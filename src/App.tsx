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
        darkMode
          ? "bg-slate-100 text-black min-h-screen"
          : "bg-gray-800 text-white min-h-screen"
      }
    >
      <ApolloProvider client={Client}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userdata" element={<UserData />} />
        </Routes>
      </ApolloProvider>
    </div>
  );
};

export default App;
