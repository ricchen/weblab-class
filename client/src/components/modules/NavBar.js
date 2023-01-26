import React from "react";
import Button from "./Button";
import BackButton from "./BackButton";

import "./NavBar.css";

const NavBar = (props) => {
  return (
    <>
      {/* <div className="NavBar-slider"> */}
      <nav>
        <div className="NavBar-container1">
          <BackButton />
        </div>
        <div className="NavBar-container2">
          <Button url={`/profile/${props.userId}`} name="Profile" />
        </div>
        <div className="NavBar-container3">
          <Button url="/achievements/" name="Achievements" />
        </div>
      </nav>
      {/* </div> */}
      <Button url="/game/" name="Join" />
    </>
  );
};

export default NavBar;
