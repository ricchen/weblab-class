import React from "react";
import { Link } from "@reach/router";
import Button from "./Button";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  return (
    <nav>
      <div>
        <Button url="/game/" name="Join" />
        <Button url="/profile/" name="Profile" />
        <Button url="/achievements/" name="Achievements" />
      </div>
    </nav>
  );
};

export default NavBar;
