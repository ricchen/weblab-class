import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import Button from "../modules/Button";
import { SlideOut } from "../modules/Transition";
import { BrowserRouter } from "react-router-dom";
import SpecialButton from "../modules/SpecialButton";

import maize from "../../public/pictures/bigpinkmaize.png";
import orangemaize from "../../public/pictures/bigorangemm.png";
import bluemaize from "../../public/pictures/bigbluemm.png";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "860650022251-idijj5uv8le61d1el5bbr5ts6atecan8.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <BrowserRouter>
        <SlideOut />
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} style={{ backgroundColor: "green" }}>
          <div className="skeleton-container">
            <div className="skeleton-title relative">conquer the maize</div>
          </div>

          <div className="skeleton-google-container">
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
        <div className="skeleton-button-shell">
          {userId ? (
            <SpecialButton
              url={`/start/${userId}`}
              name="START"
              style={{ marginBottom: "2vh", width: "50vw", height: "10vh" }}
            />
          ) : null}
        </div>
      </BrowserRouter>
    </>
  );
};

export default Skeleton;
