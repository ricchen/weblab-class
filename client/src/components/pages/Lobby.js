import React from "react";
import BackButton from "../modules/BackButton.js";
import NavBar from "../modules/NavBar.js";

import { SlideOut } from "../modules/Transition.js";

const Lobby = (props) => {
  return (
    <>
      <SlideOut />
      <div>lobby</div>
      <BackButton />
    </>
  );
};

export default Lobby;
