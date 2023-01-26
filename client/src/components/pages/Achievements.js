import React from "react";
import BackButton from "../modules/BackButton.js";
import NavBar from "../modules/NavBar.js";

import { SlideOut } from "../modules/Transition.js";

const Achievements = (props) => {
  return (
    <>
      <SlideOut />
      <div>achievements</div>
      <BackButton />
    </>
  );
};

export default Achievements;
