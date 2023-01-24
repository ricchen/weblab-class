import React from "react";
import Button from "./Button";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  return (
    <>
      <div className="NavBar-slider">
        <nav className="NavBar-buttons"></nav>
      </div>
      <Button url="/game/" name="Join" />
      <Button url="/profile/" name="Profile" />
      <Button url="/achievements/" name="Achievements" />
    </>
  );
};

export default NavBar;
