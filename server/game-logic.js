const { intersect, collisionVector } = require("./collision");

/** constants */
const MAP_LENGTH = 500;
const MAP_ARRAY_LENGTH = 10;
const BLOCK_LENGTH = 50;
const INITIAL_RADIUS = 20;
const PLAYER_SPEED = 3;
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "silver"]; // colors to use for players

/** Utils! */

/** Helper to generate a random integer */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

/** Helper to generate a random position on the map */
// const getRandomPosition = () => {
//   return {
//     x: getRandomInt(0, MAP_LENGTH),
//     y: getRandomInt(0, MAP_LENGTH),
//   };
// };

/** Game state */
// TODO (Step 2.1): Uncomment the following object declaration for gameState.

const mapArray = [
  "B.BBBBBBBB",
  "B.B...B...",
  "B.B.B.B.BB",
  "B.B.B.B.BB",
  "B.B.B.B.BB",
  "B.B.B.B.BB",
  "B.B.B.B.BB",
  "B.B.B.B.BB",
  "B...B...BB",
  "BBBBBBBBBB",
];

const findWalls = (array) => {
  const wallCoords = [];
  for (var j = 0; j < MAP_ARRAY_LENGTH; j++) {
    for (var i = 0; i < MAP_ARRAY_LENGTH; i++) {
      if (mapArray[j][i] == "B") {
        wallCoords.push({ x: 50 * i, y: 50 * j });
      }
    }
  }
  return wallCoords;
};
const arrayToMap = (array) => {
  const map = {};
  for (var j = 0; j < MAP_ARRAY_LENGTH; j++) {
    const row = {};
    for (var i = 0; i < MAP_ARRAY_LENGTH; i++) {
      if (mapArray[j][i] == "B") {
        row[50 * i] = "wall";
      } else {
        row[50 * i] = "empty";
      }
    }
    map[50 * j] = row;
  }
  return map;
};
const gameState = {
  winner: null,
  players: {},
  map: arrayToMap(mapArray),
  walls: findWalls(mapArray),
};

/** Game logic */

/** Adds a player to the game state, initialized with a random location */
const spawnPlayer = (id) => {
  gameState.players[id] = {
    position: { x: 50, y: 50 },
    velocity: { x: 0, y: 0 },
  };
};

/** Update the game state. This function is called once per server tick. */
// TODO (Step 2.1, pt 2): Uncomment the following function for updating the game state.
const updateGameState = () => {
  updatePlayerPositions();
  detectCollisions();
};

/** Remove a player from the game state if they disconnect or if they get eaten */
const removePlayer = (id) => {
  if (gameState.players[id] != undefined) {
    delete gameState.players[id];
  }
};

const movePlayer = (id, dir) => {
  // If player doesn't exist, don't move anything
  if (gameState.players[id] == undefined) {
    return;
  }

  // Move player (unbounded)
  if (dir === "up") {
    gameState.players[id].velocity.y = -PLAYER_SPEED;
  } else if (dir === "down") {
    gameState.players[id].velocity.y = PLAYER_SPEED;
  } else if (dir === "left") {
    gameState.players[id].velocity.x = -PLAYER_SPEED;
  } else if (dir === "right") {
    gameState.players[id].velocity.x = PLAYER_SPEED;
  }
};

const stopMovePlayer = (id, dir) => {
  // If player doesn't exist, don't move anything
  if (gameState.players[id] == undefined) {
    return;
  }

  if (dir === "up") {
    gameState.players[id].velocity.y = 0;
  } else if (dir === "down") {
    gameState.players[id].velocity.y = 0;
  } else if (dir === "left") {
    gameState.players[id].velocity.x = 0;
  } else if (dir === "right") {
    gameState.players[id].velocity.x = 0;
  }
};

const updatePlayerPositions = () => {
  Object.keys(gameState.players).forEach((id) => {
    if (gameState.players[id] != undefined) {
      gameState.players[id].position.x += gameState.players[id].velocity.x;
      gameState.players[id].position.y += gameState.players[id].velocity.y;
    }
  });
};

const detectCollisions = () => {
  Object.keys(gameState.players).forEach((id) => {
    if (gameState.players[id] != undefined) {
      gameState.walls.forEach((wall) => {
        const vector = collisionVector(
          gameState.players[id].position,
          40,
          40,
          wall,
          BLOCK_LENGTH,
          BLOCK_LENGTH
        );
        if (vector) {
          gameState.players[id].position.x += vector.dx;
          gameState.players[id].position.y += vector.dy;
        }
      });
    }
  });
};
module.exports = {
  gameState,
  updateGameState,
  spawnPlayer,
  removePlayer,
  movePlayer,
  stopMovePlayer,
};
