import React from "react";
import BackButton from "../modules/BackButton.js";
import NavBar from "../modules/NavBar.js";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { SlideOut } from "../modules/Transition.js";
import "./Tutorial.css";

import arrowkeys from "../../public/pictures/arrowkeys.png";
import maize from "../../public/pictures/bigpinkmaize.png";
import orangemaize from "../../public/pictures/bigorangemm.png";
import bluemaize from "../../public/pictures/bigbluemm.png";

const Tutorial = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <SlideOut />
      <BrowserRouter>
        <div className="Tutorial-container">
          <div className="Tutorial-subcontainer">
            <ul>
              <li className="Tutorial-li">Tutorial</li>
              <li className="Tutorial-li">Use arrow keys to move!</li>
              <li className="Tutorial-li">Grab as much maize in 2 minutes!</li>
              <li className="Tutorial-li">
                Use magical maize to buff yourself or debuff opponents!
              </li>
              <li className="Tutorial-li">Best maize collector wins!</li>
            </ul>
            <img src={arrowkeys} className="Tutorial-image" />
            <img src={maize} className="Tutorial-image" />
            <img src={orangemaize} className="Tutorial-image" />
            <img src={bluemaize} className="Tutorial-image" />
          </div>
          <div className="Tutorial-navbar"></div>
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
