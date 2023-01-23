import React from "react";
import "./Transition.css";

const SlideIn = () => {
  return (
    <div>
      <div className="slideIn darkpink top slideInTop"></div>
      <div className="slideIn lightpink mid slideInMid"></div>
      <div className="slideIn white bottom slideInBot"></div>
    </div>
  );
};

const SlideOut = () => {
  return (
    <div>
      <div className="slideOut darkpink top slideOutTop"></div>
      <div className="slideOut lightpink mid slideOutMid"></div>
      <div className="slideOut white bottom slideOutBot"></div>
    </div>
  );
};

export { SlideIn };
export { SlideOut };
