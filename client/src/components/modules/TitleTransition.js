import React from "react";
import { Link } from "@reach/router";

import "./TitleTransition.css";

const TitleTransition = () => {
  const transition1 = document.querySelector(".transition1");
  const transition2 = document.querySelector(".transition2");
  const transition3 = document.querySelector(".transition3");

  setTimeout(() => {
    transition1.classList.remove("active-transition1");
  }, 300);
  setTimeout(() => {
    transition2.classList.remove("active-transition2");
  }, 400);
  setTimeout(() => {
    transition3.classList.remove("active-transition3");
  }, 500);

  return (
    <div>
      <div className="transition1 active-transition1 darkpink top"></div>
      <div className="transition2 active-transition2 lightpink mid"></div>
      <div className="transition3 active-transition3 white bottom"></div>
    </div>
  );
};

export default TitleTransition;
