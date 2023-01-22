import React, { useState, useEffect } from "react";
import NavBar from "../modules/NavBar.js";

import { get } from "../../utilities";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  return (
    <>
      <NavBar />
      <div>profile</div>
      <div>{props.userId}</div>
    </>
  );
};

export default Profile;
