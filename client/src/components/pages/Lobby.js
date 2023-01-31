import React, { useState, useEffect } from "react";
import BackButton from "../modules/BackButton.js";
import NavBar from "../modules/NavBar.js";
import { get, post } from "../../utilities.js";
import { socket } from "../../client-socket.js";
import { SlideOut } from "../modules/Transition.js";
import { Redirect } from "@reach/router";
import { BrowserRouter } from "react-router-dom";
import "./Lobby.css";
import SpecialButton from "../modules/SpecialButton.js";

const Lobby = (props) => {
  const [usersInLobby, setUsersInLobby] = useState([]);
  const [validJoin, setValidJoin] = useState(false);
  const [lobbyFull, setLobbyFull] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [userObjs, setUserObjs] = useState({});

  useEffect(() => {
    get("/api/activeUsers").then((allUsers) => {
      if (props.userId) {
        let users = [];
        Object.keys(allUsers).forEach((userId) => {
          if (allUsers[userId] == props.roomId) {
            users.push(userId);
            get(`/api/user`, { userid: userId }).then((userObj) => {
              userObjs[userId] = userObj;
            });
          }
        });
        setUsersInLobby(users);
      }
    });
  }, []);

  useEffect(() => {
    if (usersInLobby.length === 2)
      setLobbyFull(
        <button onClick={postStart} className="Lobby-button">
          Start Game
        </button>
      );
    else setLobbyFull(null);
  }, [usersInLobby]);

  useEffect(() => {
    get("/api/verifyRoom", { roomId: props.roomId }).then((log) => {
      if (log.msg == "ok") setValidJoin(true);
    });

    const updateUsers = (allUsers) => {
      let users = [];
      Object.keys(allUsers).forEach((userId) => {
        if (allUsers[userId] == props.roomId) {
          users.push(userId);
          get(`/api/user`, { userid: userId }).then((userObj) => {
            userObjs[userId] = userObj;
          });
        }
      });
      setUsersInLobby(users);
    };
    socket.on("activeUsers", updateUsers);
    return () => {
      socket.off("activeUsers", updateUsers);
    };
  }, []);

  useEffect(() => {
    const startGame = (res) => {
      if (props.roomId == res) setHasStarted(true);
    };
    socket.on("startGame", startGame);
    return () => {
      socket.off("startGame", startGame);
    };
  });

  const postStart = () => {
    post("/api/startGame", { roomId: props.roomId });
  };
  return (
    <>
      <BrowserRouter>
        {/* {usersInLobby} */}
        {lobbyFull}

        <div className="Lobby-container">
          <div className="Lobby-subcontainer">
            {userObjs[usersInLobby[0]] ? userObjs[usersInLobby[0]].name : null}
            <img
              src={userObjs[usersInLobby[0]] ? userObjs[usersInLobby[0]].pfp : ""}
              referrerpolicy="no-referrer"
            ></img>
          </div>
          <div className="Lobby-subcontainer">
            <div className="Lobby-midpanel">
              <div className="Lobby-text" style={{ marginTop: "2em" }}>
                lobby name: {props.name}
              </div>
              <div className="Lobby-text">{props.roomId}</div>
            </div>
            <div className="Lobby-midpanel">
              <div className="Lobby-text" style={{ marginTop: "1em" }}>
                Please wait for 2 players
              </div>
            </div>
            <div className="Lobby-midpanel">
              <SpecialButton url="/tutorial" name="tutorial" />
            </div>
          </div>
          <div className="Lobby-subcontainer">
            {userObjs[usersInLobby[1]] ? userObjs[usersInLobby[1]].name : null}
            <img
              src={userObjs[usersInLobby[1]] ? userObjs[usersInLobby[1]].pfp : ""}
              referrerpolicy="no-referrer"
            ></img>
          </div>
          <div className="Lobby-navbar"></div>
        </div>

        <NavBar
          userId={props.userId}
          name1="profile"
          name2="tutorial"
          url1="/profile/"
          url2="/tutorial/"
        />
        {hasStarted ? (
          <Redirect exact from={`/lobby/${props.roomId}`} to={`/game/${props.roomId}`} />
        ) : null}
        <SlideOut />
      </BrowserRouter>
    </>
  );
};

export default Lobby;
