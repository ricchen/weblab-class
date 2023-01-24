let canvas;

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
export const drawCanvas = (drawState, canvasRef) => {
  // use canvas reference of canvas element to get reference to canvas object
  canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");

  // clear the canvas to black
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let row in drawState.map) {
    for (let col in drawState.map[row]) {
      if (drawState.map[row][col] == "wall") {
        context.fillStyle = "white";
        context.fillRect(col, row, 50, 50);
      }
    }
  }

  // draw all the players
  Object.values(drawState.players).forEach((p) => {
    drawPlayer(context, p.position.x, p.position.y, "red");
  });
};
