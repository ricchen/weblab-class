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
    drawCanvas(update, canvasRef);
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
        {validJoin ? <canvas ref={canvasRef} width="1000" height="1000" /> : <div>bad join</div>}
        {loginModal}
      </div>
    </>
  );
};

export default Game;
