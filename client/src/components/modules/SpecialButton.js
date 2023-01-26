import React from "react";
import { Link } from "@reach/router";
import { useState } from "react";
import "./SpecialButton.css";
import { SlideIn } from "./Transition";

const SpecialButton = ({ url, name }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <div className="Special-container">
        <Link
          to={url}
          className="Special-button"
          onClick={(e) => {
            setIsToggled(!isToggled);
            e.preventDefault();
            let target = e.target.href;

            setTimeout(() => {
              window.location.href = target;
            }, 1200);
          }}
        >
          {name}
        </Link>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {isToggled && <SlideIn />}
    </>
  );
};

export default SpecialButton;
