import React from "react";

import "../../mazing.css";
import "../../maze-builder.js";
import "../../fancy-maze-builder.js";
import "../../mazing.js";
<link rel="stylesheet" type="text/css" href="mazing.css" />;
var Maze1, MazeGame;
const Maze = () => {
  Maze1 = new FancyMazeBuilder(width, height);
  Maze1.display(id);
  MazeGame = new Mazing("maze");
  if (speech) {
    MazeGame.enableSpeech();
  }
  makeMaze("maze_container", 50, 50);
};

export default Maze;
