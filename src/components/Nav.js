import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/summer">Summer</NavLink>
        </li>
        <li>
          <NavLink to="/sun">Sun</NavLink>
        </li>
        <li>
          <NavLink to="/sea">Sea</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
