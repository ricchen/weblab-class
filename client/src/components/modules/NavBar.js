import React from "react";
import Button from "./Button";

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <>
      <div className="NavBar-slider">
        <nav className="NavBar-buttons">
          <Button url="/game/" name="Join" />
          <Button url={`/profile/${props.userId}`} name="Profile" />
          <Button url="/achievements/" name="Achievements" />
        </nav>
      </div>
    </>
  );
};

export default NavBar;
