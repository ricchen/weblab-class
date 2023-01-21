import React from "react";

import { Link } from "@reach/router";

const Start = () => {
  return (
    <div>
      <Link to="/game/">Join</Link>
      <Link to="/profile/">Profile</Link>
      <Link to="/achievements/">Achievements</Link>
    </div>
  );
};

export default Start;
