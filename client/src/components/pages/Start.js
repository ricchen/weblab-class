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
          <div className="Start-left-container">
            <Button url={`/profile/${props.userId}`} name="Profile" />
            <Button url="/achievements/" name="Achievements" />
            <Button url="/game/:roomId" name="Game" />
            <SpecialButton url="/" name="im special" />
          </div>
          <div className="Start-right-container">
            <input type="text" placeholder="NAME" className="Start-textbox"></input>
            <input type="text" placeholder="GAME CODE" className="Start-textbox"></input>
            <Link
              className="Start-textbox Start-button"
              to="/join/"
              onClick={(e) => {
                setIsToggled(!isToggled);
                e.preventDefault();
                let target = e.target.href;

                setTimeout(() => {
                  window.location.href = target;
                }, 1200);
              }}
            >
              JOIN LOBBY
            </Link>
            <Link
              className="Start-textbox Start-button"
              to="/lobby/"
              onClick={(e) => {
                setIsToggled(!isToggled);
                e.preventDefault();
                let target = e.target.href;

                setTimeout(() => {
                  window.location.href = target;
                }, 1200);
              }}
            >
              CREATE LOBBY
            </Link>
          </div>
          <div className="Start-navbar"></div>
          <NavBar />
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
