import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import { Link } from "@reach/router";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "860650022251-idijj5uv8le61d1el5bbr5ts6atecan8.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  const transition = document.querySelector(".transitions");
  setTimeout(() => {
    transition.classList.remove("active-transition");

    //removes "active-transition" class from transition div, which sets its opacity to 0
    //note: i removed "active-transition" class from the div because it bricked site after push
  }, 300);

  return (
    <>
      <div className="transitions"></div>

      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="skeleton-title-over relative">
          <h1 className="lightpink">EXAMPLE NAME</h1>
        </div>
        <div className="skeleton-title-under relative">
          <h1 className="darkpink">EXAMPLE NAME</h1>
        </div>

        <div className="skeleton-google relative">
          {userId ? (
            <button
              className="skeleton-button"
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
          )}
        </div>
      </GoogleOAuthProvider>
      {userId ? (
        <Link className="relative skeleton-button" to="/start/">
          Start
        </Link>
      ) : null}
    </>
  );
};

export default Skeleton;
