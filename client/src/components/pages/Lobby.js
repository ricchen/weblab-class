import React, { useState, useEffect } from "react";
import BackButton from "../modules/BackButton.js";
import NavBar from "../modules/NavBar.js";
import { get, post } from "../../utilities.js";
import { socket } from "../../client-socket.js";

import { SlideOut } from "../modules/Transition.js";
import { Redirect } from "@reach/router";

const Lobby = (props) => {
  const [usersInLobby, setUsersInLobby] = useState([]);
  const [validJoin, setValidJoin] = useState(false);
  const [lobbyFull, setLobbyFull] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    get("/api/activeUsers").then((allUsers) => {
      if (props.userId) {
        let users = [];
        Object.keys(allUsers).forEach((userId) => {
          if (allUsers[userId] == props.roomId) {
            users.push(userId);
          }
        });
        setUsersInLobby(users);
      }
      console.log(allUsers);
    });
  }, []);

  useEffect(() => {
    if (usersInLobby.length === 2) setLobbyFull(<button onClick={postStart}>Start Game</button>);
    else setLobbyFull(null);
  }, [usersInLobby]);

  useEffect(() => {
    get("/api/verifyRoom", { roomId: props.roomId }).then((log) => {
      if (log.msg == "ok") setValidJoin(true);
    });

    const updateUsers = (allUsers) => {
      let users = [];
      Object.keys(allUsers).forEach((userId) => {
        if (allUsers[userId] === props.roomId) users.push(userId);
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
      <SlideOut />
      <div>lobby</div>
      {usersInLobby}
      {lobbyFull}
      {hasStarted ? (
        <Redirect exact from={`/lobby/${props.roomId}`} to={`/game/${props.roomId}`} />
      ) : null}

      <BackButton />
    </>
  );
};

export default Lobby;
