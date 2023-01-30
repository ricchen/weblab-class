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

let canvas;

const wallImages = [];
const sources = [w0, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15];

/*   1
   8 B 2
     4      hasWall = 1, else 0
*/
const preload = (sources) => {
  for (var i = 0; i < sources.length; i++) {
    wallImages[i] = new Image();
    wallImages[i].src = sources[i];
  }
};

preload(sources);

/** utils */

// converts a coordinate in a normal X Y plane to canvas coordinates
const convertCoord = (x, y) => {
  if (!canvas) return;
  return {
    drawX: x,
    drawY: y,
  };
};

// fills a circle at a given x, y canvas coord with radius and color
const fillCircle = (context, x, y, radius, color) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
};

/** drawing functions */

const drawPlayer = (context, x, y, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, 40, 40);
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
  camera_x = Math.min(Math.max(0, p.position.x + 20 - 250), 750);
  camera_y = Math.min(Math.max(0, p.position.y + 20 - 250), 750);
  for (let row in drawState.map) {
    for (let col in drawState.map[row]) {
      if (drawState.map[row][col] >= 0) {
        // context.fillStyle = drawState.color;
        context.drawImage(
          wallImages[drawState.map[row][col]],
          col - camera_x,
          row - camera_y,
          50,
          50
        );
      } else if (drawState.map[row][col] == -1) {
        context.fillStyle = "yellow";
        context.fillRect(col - camera_x, row - camera_y, 50, 50);
      }
    }
  }

  // draw all the players
  Object.values(drawState.players).forEach((p) => {
    drawPlayer(context, p.position.x - camera_x, p.position.y - camera_y, "red");
  });
};
