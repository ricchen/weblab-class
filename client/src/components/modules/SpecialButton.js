import React from "react";
import { Link } from "@reach/router";
import { useState } from "react";
import "./SpecialButton.css";
import { SlideIn } from "./Transition";

const SpecialButton = ({ url, name, style, onClick }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
      <Link
        to={url}
        className="Special-button"
        style={style}
        onClick={(e) => {
          {
            onClick;
          }

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

      {isToggled && <SlideIn />}
    </>
  );
};

export default SpecialButton;
