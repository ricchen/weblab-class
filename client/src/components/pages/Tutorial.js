import React from "react";
import BackButton from "../modules/BackButton.js";
import NavBar from "../modules/NavBar.js";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { SlideOut } from "../modules/Transition.js";
import "./Tutorial.css";

const Tutorial = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <SlideOut />
      <BrowserRouter>
        <div className="Tutorial-container">
          <div className="Tutorial-subcontainer"></div>
          <div className="Tutorial-subcontainer"></div>
          <div className="Tutorial-navbar orange"></div>
          <NavBar
            userId={props.userId}
            name1="home"
            name2="profile"
            url1="/start/"
            url2="/profile/"
          />
        </div>
        {isToggled && <SlideIn />}
        <SlideOut />
      </BrowserRouter>
    </>
  );
};

export default Tutorial;
