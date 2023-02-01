import React from "react";
import { SlideIn, SlideOut } from "../modules/Transition";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <SlideOut />
      <div style={{ display: "flex" }}>
        <div className="NotFound-title">404 Not Found</div>
        <div className="NotFound-text">The page you requested could not be found</div>
      </div>
    </>
  );
};

export default NotFound;
