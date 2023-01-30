import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { get } from "../../utilities";
import { SlideIn } from "../modules/Transition.js";
import { SlideOut } from "../modules/Transition.js";
import NavBar from "../modules/NavBar";
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (props.userId) {
      get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    }
  }, []);

  const [isToggled, setIsToggled] = useState(false);

  const [isClicked, setIsClicked] = useState(false);
  const clicked = () => {
    setIsClicked((isClicked) => !isClicked);
  };
  let clickClass = isClicked ? "Profile-test" : "";
  let clickClassClone = isClicked ? "Profile-clone-test" : "";

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
          <div>{user.wins}</div>
          <div>{user.games}</div>
          <div className="Profile-container">
            <div className="Profile-left-container">
              <div
                className={`Profile-panel Profile-left Profile-transition ${clickClass}`}
                onClick={clicked}
              >
                <div className="Profile-subpanel" style={{ flex: 1 }}>
                  <h1 className="Profile-name">{user.name}</h1>
                </div>
                <div className="Profile-subpanel" style={{ flex: 4 }}>
                  <img
                    src={user ? user.pfp : ""}
                    className="Profile-picture"
                    referrerpolicy="no-referrer"
                  ></img>
                </div>
              </div>
              <div className={`Profile-panel-clone ${clickClassClone}`} onClick={clicked}></div>
            </div>
            <div className="Profile-right-container">
              <div className="Profile-panel Profile-transition"></div>
            </div>
            <div className="Profile-navbar"></div>
            <NavBar
              userId={props.userId}
              name1="home"
              name2="achievements"
              url1="/start/"
              url2="/achievements/"
            />
          </div>
          {isToggled && <SlideIn />}
          <SlideOut />
        </BrowserRouter>
      </>
    );
  }
};

export default Profile;
