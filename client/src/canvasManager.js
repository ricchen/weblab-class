import w0 from "./public/tileset/tiles/default-tile.png";
import w1 from "./public/tileset/walls/top-wall.png";
import w2 from "./public/tileset/walls/right-wall.png";
import w3 from "./public/tileset/walls/tr-wall.png";
import w4 from "./public/tileset/walls/bottom-wall.png";
import w5 from "./public/tileset/walls/vert-default-wall.png";
import w6 from "./public/tileset/walls/rb-wall.png";
import w7 from "./public/tileset/walls/trb-wall.png";
import w8 from "./public/tileset/walls/left-wall.png";
import w9 from "./public/tileset/walls/tl-wall.png";
import w10 from "./public/tileset/walls/hor-default-wall.png";
import w11 from "./public/tileset/walls/tlr-wall.png";
import w12 from "./public/tileset/walls/lb-wall.png";
import w13 from "./public/tileset/walls/tlb-wall.png";
import w14 from "./public/tileset/walls/lrb-wall.png";
import w15 from "./public/tileset/walls/tlrb-wall.png";

import b1 from "./public/tileset/borders/top-border.png";
import b2 from "./public/tileset/borders/right-border.png";
import b3 from "./public/tileset/borders/bottom-border.png";
import b4 from "./public/tileset/borders/left-border.png";
import b5 from "./public/tileset/borders/topright-border.png";
import b6 from "./public/tileset/borders/bottomright-border.png";
import b7 from "./public/tileset/borders/bottomleft-border.png";
import b8 from "./public/tileset/borders/topleft-border.png";

import c1 from "./public/pictures/bigpinkmaize.png";
import c2 from "./public/pictures/bigorangemm.png";
import c3 from "./public/pictures/bigbluemm.png";

import p1 from "./public/charactersprite/spriteup.png";
import p2 from "./public/charactersprite/spriteright.png";
import p3 from "./public/charactersprite/spritedown.png";
import p4 from "./public/charactersprite/spriteleft.png";
import u1 from "./public/charactersprite/spritewalk-u1.png";
import u2 from "./public/charactersprite/spritewalk-u2.png";
import r1 from "./public/charactersprite/spritewalk-r1.png";
import r2 from "./public/charactersprite/spritewalk-r2.png";
import d1 from "./public/charactersprite/spritewalk-d1.png";
import d2 from "./public/charactersprite/spritewalk-d2.png";
import l1 from "./public/charactersprite/spritewalk-l1.png";
import l2 from "./public/charactersprite/spritewalk-l2.png";

import rp1 from "./public/charactersprite/red/spriteup.png";
import rp2 from "./public/charactersprite/red/spriteright.png";
import rp3 from "./public/charactersprite/red/spritedown.png";
import rp4 from "./public/charactersprite/red/spriteleft.png";
import ru1 from "./public/charactersprite/red/spritewalk-u1.png";
import ru2 from "./public/charactersprite/red/spritewalk-u2.png";
import rr1 from "./public/charactersprite/red/spritewalk-r1.png";
import rr2 from "./public/charactersprite/red/spritewalk-r2.png";
import rd1 from "./public/charactersprite/red/spritewalk-d1.png";
import rd2 from "./public/charactersprite/red/spritewalk-d2.png";
import rl1 from "./public/charactersprite/red/spritewalk-l1.png";
import rl2 from "./public/charactersprite/red/spritewalk-l2.png";

import bp1 from "./public/charactersprite/blue/spriteup.png";
import bp2 from "./public/charactersprite/blue/spriteright.png";
import bp3 from "./public/charactersprite/blue/spritedown.png";
import bp4 from "./public/charactersprite/blue/spriteleft.png";
import bu1 from "./public/charactersprite/blue/spritewalk-u1.png";
import bu2 from "./public/charactersprite/blue/spritewalk-u2.png";
import br1 from "./public/charactersprite/blue/spritewalk-r1.png";
import br2 from "./public/charactersprite/blue/spritewalk-r2.png";
import bd1 from "./public/charactersprite/blue/spritewalk-d1.png";
import bd2 from "./public/charactersprite/blue/spritewalk-d2.png";
import bl1 from "./public/charactersprite/blue/spritewalk-l1.png";
import bl2 from "./public/charactersprite/blue/spritewalk-l2.png";
let canvas;

const wallImages = [];
const sources = [
  w0,
  w1,
  w2,
  w3,
  w4,
  w5,
  w6,
  w7,
  w8,
  w9,
  w10,
  w11,
  w12,
  w13,
  w14,
  w15,
  b1,
  b2,
  b3,
  b4,
  b5,
  b6,
  b7,
  b8,
];

const cornImage = [];
const cornSources = [c1, c2, c3];

const playerStillImage = [];
const playerStillSources = [p1, p2, p3, p4, rp1, rp2, rp3, rp4, bp1, bp2, bp3, bp4];

const playerMoveImage = [];
const playerMoveSources = [
  u1,
  u2,
  r1,
  r2,
  d1,
  d2,
  l1,
  l2,
  ru1,
  ru2,
  rr1,
  rr2,
  rd1,
  rd2,
  rl1,
  rl2,
  bu1,
  bu2,
  br1,
  br2,
  bd1,
  bd2,
  bl1,
  bl2,
];
/*   1
   8 B 2
     4      hasWall = 1, else 0
*/
const preload = (sources) => {
  for (var i = 0; i < sources.length; i++) {
    wallImages[i] = new Image();
    wallImages[i].src = sources[i];
  }
  for (var i = 0; i < cornSources.length; i++) {
    cornImage[i] = new Image();
    cornImage[i].src = cornSources[i];
  }

  for (var i = 0; i < playerStillSources.length; i++) {
    playerStillImage[i] = new Image();
    playerStillImage[i].src = playerStillSources[i];
  }

  for (var i = 0; i < playerMoveSources.length; i++) {
    playerMoveImage[i] = new Image();
    playerMoveImage[i].src = playerMoveSources[i];
  }
};

preload(sources);

/** utils */

const WIDTH = 10;
const BLOCK_LENGTH = 75;
const PLAYER_LENGTH = 60;
const CANVAS_LENGTH = 750;
const MAP_LENGTH = (2 * WIDTH + 1) * BLOCK_LENGTH;
const DIR_ARRAY = { up: 0, right: 1, down: 2, left: 3 };
const DIR_WALK_ARRAY = { "up-walk": 0, "right-walk": 1, "down-walk": 2, "left-walk": 3 };
let WALK_POSITION = 0;

setInterval(() => {
  WALK_POSITION = 1 - WALK_POSITION;
}, 500);

/** drawing functions */

const drawPlayer = (context, x, y, dir, effect) => {
  let shift = 0;
  if (effect === "speed") shift = 1;
  if (effect === "slow") shift = 2;
  if (dir in DIR_ARRAY) {
    context.drawImage(
      playerStillImage[DIR_ARRAY[dir] + 4 * shift],
      x,
      y,
      PLAYER_LENGTH,
      PLAYER_LENGTH
    );
  } else {
    context.drawImage(
      playerMoveImage[DIR_WALK_ARRAY[dir] * 2 + WALK_POSITION + 8 * shift],
      x,
      y,
      PLAYER_LENGTH,
      PLAYER_LENGTH
    );
  }
};

/** main draw */
export const drawCanvas = (allGames, canvasRef, userId, gameId) => {
  // use canvas reference of canvas element to get reference to canvas object
  let drawState = allGames[gameId];
  canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");

  // clear the canvas to black
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  let camera_x;
  let camera_y;
  let p = drawState.players[userId];
  camera_x = Math.min(
    Math.max(0, p.position.x + PLAYER_LENGTH / 2 - CANVAS_LENGTH / 2),
    MAP_LENGTH - CANVAS_LENGTH
  );
  camera_y = Math.min(
    Math.max(0, p.position.y + PLAYER_LENGTH / 2 - CANVAS_LENGTH / 2),
    MAP_LENGTH - CANVAS_LENGTH
  );
  for (let row in drawState.map) {
    for (let col in drawState.map[row]) {
      if (drawState.map[row][col] >= 0) {
        // context.fillStyle = drawState.color;
        context.drawImage(
          wallImages[drawState.map[row][col]],
          col - camera_x,
          row - camera_y,
          BLOCK_LENGTH,
          BLOCK_LENGTH
        );
      } else if (drawState.map[row][col] < 0) {
        context.clearRect(col - camera_x, row - camera_y, BLOCK_LENGTH, BLOCK_LENGTH);
        context.drawImage(
          wallImages[0],
          col - camera_x,
          row - camera_y,
          BLOCK_LENGTH,
          BLOCK_LENGTH
        );
        context.drawImage(
          cornImage[-drawState.map[row][col] - 1],
          col - camera_x,
          row - camera_y,
          BLOCK_LENGTH,
          BLOCK_LENGTH
        );
      } else if (drawState.map[row][col] == -2) {
        context.fillStyle = "white";
        context.fillRect(col - camera_x, row - camera_y, BLOCK_LENGTH, BLOCK_LENGTH);
      }
    }
  }

  // draw all the players
  Object.values(drawState.players).forEach((p) => {
    drawPlayer(context, p.position.x - camera_x, p.position.y - camera_y, p.direction, p.effect);
  });
};
