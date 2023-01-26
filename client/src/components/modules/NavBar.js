import React from "react";
import Button from "./Button";
import BackButton from "./BackButton";
import { SlideIn } from "./Transition";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./NavBar.css";

//THIS NAVBAR IS NOT UNIVERSAL FOR EACH PAGE!! SPECIALIZED FOR START PAGE

const NavBar = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <div className="NavBar-container">
        <Link
          className="NavBar-button"
          to={`/profile/${props.userId}`}
          onClick={(e) => {
            setIsToggled(!isToggled);
            e.preventDefault();
            let target = e.target.href;

            setTimeout(() => {
              window.location.href = target;
            }, 1200);
          }}
        >
          PROFILE
        </Link>

        <Link
          className="NavBar-button"
          to="/achievements/"
          onClick={(e) => {
            setIsToggled(!isToggled);
            e.preventDefault();
            let target = e.target.href;

            setTimeout(() => {
              window.location.href = target;
            }, 1200);
          }}
        >
          ACHIEVEMENTS
        </Link>
      </div>

      {isToggled && <SlideIn />}
    </>
  );
};

export default NavBar;
{
  /* <nav>
        <BackButton />

        <Button url={`/profile/${props.userId}`} name="Profile" />

        <Button url="/achievements/" name="Achievements" />
      </nav>
      </div> */
}
