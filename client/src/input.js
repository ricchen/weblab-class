// TODO (Step 3.1): Uncomment the following import statement to import the move function we just wrote.
import { move, stopMove } from "./client-socket";

// TODO (Step 3.2): This function is where the client will handle user inputs from mouse and keyboard.
//    One of the directions is done for you. Complete the rest of the inputs to emit "down", "left", and "right".
//    Check https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values for names of keys.
/** Callback function that calls correct movement from key */
export const keyDown = (e) => {
  if (e.key === "ArrowUp") {
    move("up");
  } else if (e.key === "ArrowDown") {
    move("down");
  } else if (e.key === "ArrowLeft") {
    move("left");
  } else if (e.key === "ArrowRight") {
    move("right");
  }
};

export const keyUp = (e) => {
  if (e.key === "ArrowUp") {
    stopMove("up");
  } else if (e.key === "ArrowDown") {
    stopMove("down");
  } else if (e.key === "ArrowLeft") {
    stopMove("left");
  } else if (e.key === "ArrowRight") {
    stopMove("right");
  }
};
