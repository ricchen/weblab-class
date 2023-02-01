import React from "react";
import BackButton from "../modules/BackButton.js";
import NavBar from "../modules/NavBar.js";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { SlideOut } from "../modules/Transition.js";
import "./Tutorial.css";
import arrowkeys from "../../public/pictures/arrowkeys.png";
import maize from "../../public/pictures/pinkmaize.png";

const Tutorial = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <SlideOut />
      <BrowserRouter>
        <div className="Tutorial-container">
          <div className="Tutorial-subcontainer">
            <ul>
              <li>Use arrow keys to move!</li>
              <li>Grab as much maize in 2 minutes!</li>
              <li>Grab magical maize to buff yourself or debuff opponents!</li>
              <li>Best maize collector wins!</li>
            </ul>
            <img src={arrowkeys} className="Tutorial-image" />
            <img src={maize} className="Tutorial-image" />
          </div>
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
