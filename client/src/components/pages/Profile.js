import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { get } from "../../utilities";
import { SlideIn } from "../modules/Transition.js";
import { SlideOut } from "../modules/Transition.js";
import NavBar from "../modules/NavBar";
import "./Profile.css";
import BadJoin from "../modules/BadJoin";

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
        <BadJoin />
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <div className="Profile-container">
            <div className="Profile-left-container">
              <div className="Profile-panel Profile-left Profile-transition">
                <div className="Profile-subpanel" style={{ flex: 1 }}>
                  <h1 className="Profile-name">{user.name}</h1>
                </div>
                <div className="Profile-subpanel" style={{ flex: 4 }}>
                  <img
                    src={user ? user.pfp : ""}
                    className={`Profile-picture ${clickClass}`}
                    onClick={clicked}
                    referrerpolicy="no-referrer"
                  ></img>
                </div>
              </div>
            </div>
            <div className="Profile-right-container">
              <div className="Profile-panel Profile-transition">
                <ul>
                  <li className="Profile-li">stats</li>
                  <li className="Profile-li">wins: {user.wins}</li>
                  <li className="Profile-li">games played: {user.games}</li>
                </ul>
              </div>
            </div>
            <div className="Profile-navbar"></div>
            <NavBar
              userId={props.userId}
              name1="home"
              name2="tutorial"
              url1="/start/"
              url2="/tutorial/"
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
