import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";
import { drawCanvas } from "../../canvasManager";
import { keyDown, keyUp } from "../../input";
import { SlideOut } from "../modules/Transition";

import "../../utilities.css";

const Game = (props) => {
  const canvasRef = useRef(null);

  // add event listener on mount
  useEffect(() => {
    // TODO (Step 3.3): add event listener when the page is loaded (1 line)
    // Hint: `window` is a global variable on which you should call `addEventListener`
    // The type of event listener is "keydown", and the listener is the `handleInput` function
    // we imported from input.js. Refer to documentation for `addEventListener` here:
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    // Your code goes here!
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    // remove event listener on unmount
    return () => {
      // TODO (Step 3.3, pt 2): remove event listener when the page unmounts (1 line)
      // This return statement allows us to run code when the user leaves the page.
      // Hint: `window` also has a `removeEventListener` method
      // Your code goes here!
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
        <canvas ref={canvasRef} width="5000" height="5000" />
        {loginModal}
      </div>
    </>
  );
};

export default Game;
