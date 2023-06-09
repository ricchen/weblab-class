import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Start from "./pages/Start.js";
import Game from "./pages/Game.js";
import Profile from "./pages/Profile.js";
import Tutorial from "./pages/Tutorial.js";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import NavBar from "./modules/NavBar.js";
import Lobby from "./pages/Lobby.js";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <div className="App-body">
        <Router>
          <Skeleton
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />
          <Start path="/start/:userId" userId={userId} />
          <Game path="/game/:roomId" userId={userId} />
          <Tutorial path="/tutorial/:userId" userId={userId} />
          <Profile path="/profile/:userId" />
          <Lobby path="/lobby/:roomId" userId={userId} />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
