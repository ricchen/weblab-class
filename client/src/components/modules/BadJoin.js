import React from "react";
import "./BadJoin.css";
import { SlideOut } from "./Transition";

const BadJoin = () => {
  return (
    <>
      <SlideOut />
      <div style={{ display: "flex" }}>
        <div className="BadJoin-title">Bad Join</div>
        <div className="BadJoin-text">Please log in and try again</div>
      </div>
    </>
  );
};

export default BadJoin;
