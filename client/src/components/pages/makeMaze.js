import React from "react";

import MazeBuilder from "../../maze-builder.js";
import FancyMazeBuilder from "../../fancy-maze-builder.js";
import Mazing from "../../mazing.js";
<link rel="stylesheet" type="text/css" href="../../mazing.css" />;
<div id="maze_container"></div>;
var Maze, MazeGame;
const makeMaze = (id, width, height, speech = false) => {
  Maze = new FancyMazeBuilder(width, height);
  Maze.display(id);
  console.log(id);
  MazeGame = new Mazing("maze");
  if (speech) {
    MazeGame.enableSpeech();
  }
};

export default makeMaze("maze_container", 50, 50);
