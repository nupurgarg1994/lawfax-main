import "./navbar.css";
import React from "react";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { links } from "./data";
import { useState } from "react";
import { useAuth } from "../../../pages/Login-Logout/AuthContext";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);

  const { isLoggedIn, logout } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    // Perform logout actions here (e.g., clear authentication tokens)
    setIsNavShowing(false);
    logout();
  };

  return (
    <nav className={`container nav-container ${isNavShowing ? 'show-nav' : ''}`}>
      <div className="nav-logo">
        <h1>
          <NavLink className={"logo"} to={"/"} onClick={() => setIsNavShowing(false)}>
            Lawfax
          </NavLink>
        </h1>
      </div>

      <div className={`navbar-menu-links ${isNavShowing ? 'show-nav' : 'hide-nav'}`}>
        <ul>
          {isLoggedIn ? (
            <>
              {links.map(({ name, path }, index) => (
                <li key={index}>
                  <NavLink to={path} className={({ isActive }) => (isActive ? 'active-nav' : "")} onClick={() => setIsNavShowing(false)}>
                    {name}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink to='/' onClick={handleSignOut}>Sign Out</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" onClick={() => setIsNavShowing(false)}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" onClick={() => setIsNavShowing(false)}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <button className="nav-toggle-btn" onClick={() => setIsNavShowing((prev) => !prev)}>
        {isNavShowing ? <MdClose /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
