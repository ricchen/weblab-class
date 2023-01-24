import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import Button from "../modules/Button";
import { SlideOut } from "../modules/Transition";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "860650022251-idijj5uv8le61d1el5bbr5ts6atecan8.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <SlideOut />
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
    </>
  );
};

export default Skeleton;
