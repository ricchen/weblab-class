import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

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
        <div> User not found. Please try logging in again. </div>
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <div className="Profile-container">
            <div className="wow">profile</div>
            <div>{user.name}</div>
            <div className="Profile-picture-container">
              <img
                src={user ? user.pfp : ""}
                className="Profile-picture"
                referrerpolicy="no-referrer"
              ></img>
            </div>
          </div>
          <SlideOut />
        </BrowserRouter>
      </>
    );
  }
};

export default Profile;
