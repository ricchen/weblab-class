import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import Transition from "../modules/Transition";
import { Link } from "@reach/router";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "860650022251-idijj5uv8le61d1el5bbr5ts6atecan8.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <Transition />
      {/* delete this if site bricks to sign into google then put this back in*/}

      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="skeleton-title-over relative">
          <h1 className="skeleton-lightpink">EXAMPLE NAME</h1>
        </div>
        <div className="skeleton-title-under relative">
          <h1 className="skeleton-darkpink">EXAMPLE NAME</h1>
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
