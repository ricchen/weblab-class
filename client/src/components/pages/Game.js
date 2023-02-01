import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";
import { drawCanvas } from "../../canvasManager";
import { keyDown, keyUp } from "../../input";
import { SlideOut } from "../modules/Transition";

import "../../utilities.css";
import "./Game.css";
import BadJoin from "../modules/BadJoin.js";
import NavBar from "../modules/NavBar.js";
import { BrowserRouter } from "react-router-dom";

//props
//roomId, String
const Game = (props) => {
  const canvasRef = useRef(null);
  const [validJoin, setValidJoin] = useState(false);
  const [winnerModal, setWinnerModal] = useState(null);
  const [usersInLobby, setUsersInLobby] = useState([]);
  const [userObjs, setUserObjs] = useState({});
  const [score, setScore] = useState();
  const [timer, setTimer] = useState();

  // add event listener on mount
  useEffect(() => {
    get("/api/verifyRoom", { roomId: props.roomId }).then((log) => {
      if (log.msg == "ok") setValidJoin(true);
    });
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  useEffect(() => {
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

  // update game periodically
  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
  }, []);

  const processUpdate = (update) => {
    if (update[props.roomId] && update[props.roomId].tie) {
      setWinnerModal(
        <div className="Game-panel">
          <div className="Game-victory">It's a tie! No one wins</div>
        </div>
      );
    } else if (
      update[props.roomId] &&
      update[props.roomId].winner &&
      userObjs[update[props.roomId].winner]
    ) {
      setWinnerModal(
        <div className="Game-panel">
          <div className="Game-victory">
            the winner is {userObjs[update[props.roomId].winner].name}
            <br />
            <br />
            congrats!
          </div>
        </div>
      );
    } else setWinnerModal(null);
    drawCanvas(update, canvasRef, props.userId, props.roomId);
    updateScore(update);
  };

  const updateScore = (update) => {
    setScore(update[props.roomId].players[props.userId].score);
    setTimer(update[props.roomId].timer);
  };

  // display text if the player is not logged in
  let loginModal = null;
  if (!props.userId) {
    return <div> Please Login First! </div>;
  }
  if (!validJoin) {
    return <BadJoin />;
  } else
    return (
      <>
        <BrowserRouter>
          <SlideOut />
          <div className="Game-container">
            {/* important: canvas needs id to be referenced by canvasManager */}
            <canvas
              ref={canvasRef}
              width="750"
              height="750"
              style={{ width: "45vw", height: "79.992vh" }}
            />
            {loginModal}
            {winnerModal}
            <div className="Game-ui">Score: {score}</div>
            <div className="Game-ui">Time: {timer}</div>
          </div>
          <NavBar
            name1="home"
            name2="profile"
            url1="/start/"
            url2="/profile/"
            userId={props.userId}
          />
        </BrowserRouter>
      </>
    );
};

export default Game;
