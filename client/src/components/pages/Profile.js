import React, { useState, useEffect } from "react";
import NavBar from "../modules/NavBar.js";

import { get } from "../../utilities";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  } else {
    console.log(user.pfp);
    return (
      <>
        <NavBar />
        <div>profile</div>
        <div>{user.name}</div>
        <img src={user ? user.pfp : ""}></img>
      </>
    );
  }
};

export default Profile;
