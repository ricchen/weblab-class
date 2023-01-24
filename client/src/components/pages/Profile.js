import React, { useState, useEffect } from "react";
import NavBar from "../modules/NavBar.js";

import { get } from "../../utilities";
import { SlideOut } from "../modules/Transition.js";
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (props.userId) {
      get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    }
  }, []);

  if (!user) {
    return (
      <>
        <SlideOut />
        <div> Loading! </div>
      </>
    );
  } else {
    return (
      <>
        <SlideOut />
        <div className="wow">profile</div>
        <div>{user.name}</div>
        <div className="Profile-picture-container">
          <img src={user ? user.pfp : ""} className="Profile-picture"></img>
        </div>
      </>
    );
  }
};

export default Profile;
