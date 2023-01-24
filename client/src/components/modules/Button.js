import React from "react";
import { Link } from "@reach/router";
import { useState } from "react";
import "./Button.css";
import { SlideIn } from "./Transition";

const Button = ({ url, name }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="button-shell">
      <Link
        to={url}
        className="button"
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
      {isToggled && <SlideIn />}
    </div>
  );
};
//delay website from going to new page to show page transition
export default Button;
