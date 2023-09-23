import React, { useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ThemeToggleButton from "../ThemeToggleButton";
import { ThemeContext } from "../ContextApi/ThemeContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`header ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Navbar bg="dark" expand="lg" variant="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/">
              <div
                className={`text-center p-2 m-2 text-2xl font-extrabold ${
                  darkMode ? "text-black" : "text-white"
                } shadow-lg ${darkMode ? "bg-slate-200" : "bg-black"}`}
              >
                YTS
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">
                <Link
                  className={` ${darkMode ? "text-blue-300" : "text-white"}`}
                  to="/"
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link
                  className={` ${darkMode ? "text-blue-300" : "text-white"}`}
                  to="/"
                >
                  3D
                </Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link
                  className={` ${darkMode ? "text-blue-300" : "text-white"}`}
                  to="/"
                >
                  4K
                </Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link
                  className={`${darkMode ? "text-blue-300" : "text-white"}`}
                  to="/userdata"
                >
                  UserData
                </Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link
                  className={`${darkMode ? "text-blue-300" : "text-white"}`}
                  to="/"
                >
                  Browse Movies
                </Link>
              </Nav.Link>
            </Nav>
            <ThemeToggleButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
