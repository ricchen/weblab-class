import React, { useState, useEffect } from "react";
import NavBar from "../modules/NavBar.js";

import { get } from "../../utilities";
import { SlideOut } from "../modules/Transition.js";

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
    console.log(user.pfp);
    return (
      <>
        <SlideOut />
        <NavBar />
        <div>profile</div>
        <div>{user.name}</div>
        <img src={user ? user.pfp : ""}></img>
      </>
    );
  }
};

export default Profile;
