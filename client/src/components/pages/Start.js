import React from "react";

import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { SlideOut } from "../modules/Transition";
import { SlideIn } from "../modules/Transition";
import { Link } from "react-router-dom";
import Button from "../modules/Button";

import "./Start.css";
import NavBar from "../modules/NavBar";
import SpecialButton from "../modules/SpecialButton";

const Start = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className="Start-container">
          <div className="Start-left-container"></div>
          <div className="Start-right-container">
            <input type="text" placeholder="NAME" className="Start-textbox"></input>
            <input type="text" placeholder="GAME CODE" className="Start-textbox"></input>
            <SpecialButton
              url="/join/"
              name="JOIN LOBBY"
              className="Start-textbox Start-button"
              style={{ marginBottom: "3em", width: "80%" }}
            />
            <SpecialButton
              url="/lobby/"
              name="CREATE LOBBY"
              className="Start-textbox Start-button"
              style={{ width: "80%" }}
            />
          </div>
          <div className="Start-navbar"></div>
          <NavBar userId={props.userId} />
        </div>

        {isToggled && <SlideIn />}

        <SlideOut />
      </BrowserRouter>
    </>
  );
};

export default Start;

{
  /* <NavBar userId={props.userId} back="/" /> */
}
