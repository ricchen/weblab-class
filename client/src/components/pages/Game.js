import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";
import { drawCanvas } from "../../canvasManager";
import { keyDown, keyUp } from "../../input";
import { SlideOut } from "../modules/Transition";

import "../../utilities.css";

//props
//roomId, String
const Game = (props) => {
  const canvasRef = useRef(null);
  const [validJoin, setValidJoin] = useState(false);
  const [winnerModal, setWinnerModal] = useState(null);
  const [statsAdded, setStatsAdded] = useState(false);

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
      if (!statsAdded) {
        console.log(statsAdded);
        addStats(update);
        setStatsAdded(true);
        console.log(statsAdded);
      }
    } else setWinnerModal(null);
    drawCanvas(update, canvasRef, props.userId, props.roomId);
  };

  const addStats = (update) => {
    let keys = Object.keys(update[props.roomId].players);
    let loserId = keys[0] === update[props.roomId].winner ? keys[1] : keys[0];
    console.log("winr");
    console.log(update[props.roomId].winner);
    console.log("loser");
    console.log(loserId);
    post("/api/addStats", { winner: update[props.roomId].winner, loser: loserId });
  };

  // display text if the player is not logged in
  let loginModal = null;
  if (!props.userId) {
    loginModal = <div> Please Login First! </div>;
  }

  return (
    <>
      <SlideOut />
      <div>
        {/* important: canvas needs id to be referenced by canvasManager */}
        {validJoin ? <canvas ref={canvasRef} width="500" height="500" /> : <div>bad join</div>}
        {loginModal}
        {winnerModal}
      </div>
    </>
  );
};

export default Game;
