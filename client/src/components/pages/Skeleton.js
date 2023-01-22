import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import TitleTransition from "../modules/TitleTransition";
import { Link } from "@reach/router";
import Button from "../modules/Button";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "860650022251-idijj5uv8le61d1el5bbr5ts6atecan8.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <TitleTransition />
      {/* delete this if site bricks to sign into google then put this back in*/}
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="skeleton-title relative">
          <h1 className="skeleton-lightpink">EXAMPLE NAME</h1>
        </div>

        <div className="skeleton-google relative">
          {userId ? (
            <button
              className="skeleton-button absolute topright"
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
      <div className="skeleton-button-shell">
        {userId ? <Button url="/start/" name="START" /> : null}
      </div>
      <Button url="/start/" name="hello" /> {/*example of button component */}
    </>
  );
};

export default Skeleton;
