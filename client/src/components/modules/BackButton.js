import React from "react";
import { Link } from "@reach/router";
import { useState } from "react";
import "./BackButton.css";
import { SlideIn } from "./Transition";

const BackButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="back-button-shell">
      <Link
        to="/"
        className="back-button"
        onClick={(e) => {
          setIsToggled(!isToggled);
          e.preventDefault();

          setTimeout(() => {
            history.back();
          }, 1200);
        }}
      >
        Back
      </Link>
      {isToggled && <SlideIn />}
    </div>
  );
};

export default BackButton;
