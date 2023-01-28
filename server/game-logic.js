const { collisionVector } = require("./collision");
// MazeBuilder = require("./maze-builder");

/** constants */
const WIDTH = 10;
const LENGTH = 10;
const MAP_LENGTH = 500;
const MAP_ARRAY_LENGTH = WIDTH;
const BLOCK_LENGTH = 50;
const INITIAL_RADIUS = 20;
const PLAYER_SPEED = 10;
const colors = ["blue", "green", "yellow", "purple", "orange", "silver"]; // colors to use for players

const userToGameMap = {}; // maps user ID to a

/** Utils! */

const allGames = {};

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
      if (array[j][i] == "B") {
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
      if (array[j][i] == "B") {
        row[50 * i] = "wall";
      } else {
        row[50 * i] = "empty";
      }
    }
    map[50 * j] = row;
  }
  return map;
};
const createRoom = (gameId) => {
  allGames[gameId] = {
    winner: null,
    players: {},
    map: arrayToMap(mapArray),
    walls: findWalls(mapArray),
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

/** Game logic */

const spawnPlayer = (gameId, id) => {
  let gameState = allGames[gameId];
  gameState.players[id] = {
    position: { x: 50, y: 50 },
    velocity: { x: 0, y: 0 },
  };
  userToGameMap[id] = gameId;
};

const updateGameState = () => {
  Object.keys(allGames).forEach((gameId) => {
    updatePlayerPositions(gameId);
    detectCollisions(gameId);
  });
};

/** Remove a player from the game state if they disconnect or if they get eaten */
const removePlayer = (id) => {
  let gameId = userToGameMap[id];
  let gameState = allGames[gameId];
  if (gameState.players[id] != undefined) {
    delete gameState.players[id];
  }
  delete userToGameMap[id];
};

const movePlayer = (id, dir) => {
  let gameId = userToGameMap[id];
  let gameState = allGames[gameId];
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
  let gameId = userToGameMap[id];
  let gameState = allGames[gameId];
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

const updatePlayerPositions = (gameId) => {
  let gameState = allGames[gameId];
  Object.keys(gameState.players).forEach((id) => {
    if (gameState.players[id] != undefined) {
      gameState.players[id].position.x += gameState.players[id].velocity.x;
      gameState.players[id].position.y += gameState.players[id].velocity.y;
    }
  });
};

const detectCollisions = (gameId) => {
  let gameState = allGames[gameId];
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
  allGames,
  createRoom,
  updateGameState,
  spawnPlayer,
  removePlayer,
  movePlayer,
  stopMovePlayer,
};
