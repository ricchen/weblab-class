import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import { Link } from "@reach/router";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "860650022251-idijj5uv8le61d1el5bbr5ts6atecan8.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div>
          <h1 className="skeleton-title">EXAMPLE NAME</h1>
        </div>

        <div className="skeleton-google">
          {userId ? (
            <button
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
      {userId ? <Link to="/start/">Start</Link> : null}
    </>
  );
};

export default Skeleton;
