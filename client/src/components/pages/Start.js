import React from "react";
import NavBar from "../modules/NavBar.js";
import { SlideOut } from "../modules/Transition";

const Start = (props) => {
  return (
    <>
      <SlideOut />
      <NavBar />
      <div>START GAME</div>
    </>
  );
};

export default Start;
