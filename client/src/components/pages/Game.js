import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";
import { drawCanvas } from "../../canvasManager";
import { keyDown, keyUp } from "../../input";
import { SlideOut } from "../modules/Transition";

import "../../utilities.css";
import "./Game.css";

//props
//roomId, String
const Game = (props) => {
  const canvasRef = useRef(null);
  const [validJoin, setValidJoin] = useState(false);
  const [winnerModal, setWinnerModal] = useState(null);

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

  // update game periodically
  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
  }, []);

  const processUpdate = (update) => {
    if (update[props.roomId].winner) {
      setWinnerModal(<div>the winner is {update[props.roomId].winner} yay cool cool</div>);
    } else setWinnerModal(null);
    drawCanvas(update, canvasRef, props.userId, props.roomId);
  };

  // display text if the player is not logged in
  let loginModal = null;
  if (!props.userId) {
    loginModal = <div> Please Login First! </div>;
  }

  return (
    <>
      <SlideOut />
      <div className="Game-container">
        {/* important: canvas needs id to be referenced by canvasManager */}
        {validJoin ? <canvas ref={canvasRef} width="500" height="500" /> : <div>bad join</div>}
        {loginModal}
        {winnerModal}
      </div>
    </>
  );
};

export default Game;
