import React from "react";
import { Link } from "@reach/router";
import "./Button.css";

const Button = ({ url, name }) => {
  return (
    <div className="button-shell">
      <Link to={url} className="button">
        {name}
      </Link>
    </div>
  );
};

export default Button;
