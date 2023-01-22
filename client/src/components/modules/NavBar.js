import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  return (
    <nav>
      <div>
        <Link to="/game/">Join</Link>
        <Link to="/profile/">Profile</Link>
        <Link to="/achievements/">Achievements</Link>
      </div>
    </nav>
  );
};

export default NavBar;
