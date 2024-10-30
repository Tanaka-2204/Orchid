import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { UserAuth } from '../Context/AuthContext';
import * as React from 'react';



export default function ResponsiveAppBar() {

  const location = useLocation();
  const { theme, toggleTheme, dark } = useContext(ThemeContext);
  const { googleSignIn, user, logOut } = UserAuth();

  return (
    <div className="topnav" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      <Link className={location.pathname === "/" ? "active" : ""} to={"/"} style={{ color: theme.color }}>
        Home
      </Link>
      <Link className={location.pathname === "/contact" ? "active" : ""} to={"/contact"} style={{ color: theme.color }}>Contact</Link>
      <Link className={location.pathname === "/about" ? "active" : ""} to={"/about"} style={{ color: theme.color }}>About</Link>
      <Link className={location.pathname === "/dashboard" ? "active" : ""} to={"/dashboard"} style={{ color: theme.color }}>Dashboard</Link>
      <div>
        {user ? (
          <>
            <button onClick={logOut}>Log Out</button>
            <p>Welcome, {user.displayName}</p>
          </>
        ) : (
          <button onClick={googleSignIn}>Login</button>
        )}
      </div>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: dark ? "#333" : "#ddd",
          color: dark ? "#fff" : "#000",
        }}
      >
        {dark ? "Light" : "Dark"} Mode
      </button>

    </div>

  );
}
