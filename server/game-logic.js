const { intersect, collisionVector } = require("./collision");
const { generateMap } = require("./generateMap");

const User = require("./models/user");
const Room = require("./models/gameRoom");

// MazeBuilder = require("./maze-builder");

/** constants */
const WIDTH = 10; //ALSO CHANGE IN GENERATE MAP
const LENGTH = 10;
const MAP_LENGTH = 500;
const MAP_ARRAY_LENGTH = 2 * WIDTH + 1;
const BLOCK_LENGTH = 75;
const INITIAL_RADIUS = 20;
const PLAYER_SPEED = 10;
const WINNING_SCORE = 10;
const CORN_NUM = 10;
const colors = ["blue", "green", "purple", "orange", "silver"]; // colors to use for players

const userToGameMap = {}; // maps user ID to Game

/** Utils! */

const allGames = {};

const findWalls = (array) => {
  const wallCoords = [];
  for (var j = 0; j < MAP_ARRAY_LENGTH; j++) {
    for (var i = 0; i < MAP_ARRAY_LENGTH; i++) {
      if (array[j][i] == "B" || array[j][i] == "b") {
        wallCoords.push({ x: BLOCK_LENGTH * i, y: BLOCK_LENGTH * j });
      }
    }
  }
  return wallCoords;
};

const findWin = (array) => {
  const winCoords = [];
  for (var j = 0; j < MAP_ARRAY_LENGTH; j++) {
    for (var i = 0; i < MAP_ARRAY_LENGTH; i++) {
      if (array[j][i] == "W") {
        winCoords.push({ x: BLOCK_LENGTH * i, y: BLOCK_LENGTH * j });
      }
    }
  }
  return winCoords;
};
const arrayToMap = (array) => {
  const map = {};
  for (var j = 0; j < MAP_ARRAY_LENGTH; j++) {
    const row = {};
    for (var i = 0; i < MAP_ARRAY_LENGTH; i++) {
      if (array[j][i] == "B") {
        row[BLOCK_LENGTH * i] = getWallNumber(array, j, i);
      } else if (array[j][i] == "b") {
        row[BLOCK_LENGTH * i] = getBorderNumber(array, j, i) + 16;
      } else if (array[j][i] == "W") {
        row[BLOCK_LENGTH * i] = -1;
      } else {
        row[BLOCK_LENGTH * i] = 0;
      }
    }

    map[BLOCK_LENGTH * j] = row;
  }
  return map;
};

const getWallNumber = (array, row, col) => {
  let sum = 0;
  const getDir = (r, c) => {
    if (r >= 0 && r < MAP_ARRAY_LENGTH && c >= 0 && c < MAP_ARRAY_LENGTH && array[r][c] === "B")
      return 1;
    else return 0;
  };
  sum += getDir(row - 1, col);
  sum += getDir(row, col + 1) * 2;
  sum += getDir(row + 1, col) * 4;
  sum += getDir(row, col - 1) * 8;
  return sum;
};

const getBorderNumber = (array, row, col) => {
  if (row == 0 && col == 0) {
    return 7;
  } else if (row == 0 && col == MAP_ARRAY_LENGTH - 1) {
    return 4;
  } else if (row == MAP_ARRAY_LENGTH - 1 && col == MAP_ARRAY_LENGTH - 1) {
    return 5;
  } else if (row == MAP_ARRAY_LENGTH - 1 && col == 0) {
    return 6;
  } else if (row == 0) {
    return 0;
  } else if (col == 0) {
    return 3;
  } else if (row == MAP_ARRAY_LENGTH - 1) {
    return 2;
  } else if (col == MAP_ARRAY_LENGTH - 1) {
    return 1;
  }
};

const createRoom = (gameId) => {
  let mapArray = generateMap();
  allGames[gameId] = {
    winner: null,
    players: {},
    array: mapArray,
    map: arrayToMap(mapArray),
    walls: findWalls(mapArray),
    win: findWin(mapArray),
    color: colors[Math.floor(Math.random() * colors.length)],
    ongoing: true,
    corn: 0,
    reg: [],
    speed: [],
    slow: [],
    timer: 0,
  };
};

/** Game logic */

const spawnPlayer = (gameId, id) => {
  if (!id) return;
  userToGameMap[id] = gameId;
  let gameState = allGames[gameId];
  gameState.players[id] = {
    position: { x: BLOCK_LENGTH, y: BLOCK_LENGTH },
    velocity: { x: 0, y: 0 },
    score: 0,
  };
};

const updateGameState = () => {
  Object.keys(allGames).forEach((gameId) => {
    checkWin(gameId);
    updatePlayerPositions(gameId);
    detectCollisions(gameId);
    // checkScorePoint(gameId);
    spawnCorn(gameId);
    playerCollectCorn(gameId);
  });
};

/** Remove a player from the game state if they disconnect or if they get eaten */
const removePlayer = (id) => {
  if (!id) return;
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

// const checkScorePoint = (gameId) => {
//   let gameState = allGames[gameId];
//   Object.keys(gameState.players).forEach((id) => {
//     if (gameState.players[id] != undefined) {
//       gameState.win.forEach((win) => {
//         let hasScored = intersect(
//           gameState.players[id].position,
//           40,
//           40,
//           win,
//           BLOCK_LENGTH,
//           BLOCK_LENGTH
//         );
//         if (hasScored) {
//           gameState.players[id].score += 1;
//           startNewMap(gameId);
//           return;
//         }
//       });
//     }
//   });
// };

// const startNewMap = (gameId) => {
//   let mapArray = generateMap();
//   let gameState = allGames[gameId];
//   gameState.map = arrayToMap(mapArray);
//   gameState.walls = findWalls(mapArray);
//   gameState.win = findWin(mapArray);
//   gameState.color = colors[Math.floor(Math.random() * colors.length)];
//   resetPlayerPositions(gameId);
// };

// const resetPlayerPositions = (gameId) => {
//   let gameState = allGames[gameId];
//   Object.keys(gameState.players).forEach((id) => {
//     gameState.players[id].position = { x: BLOCK_LENGTH, y: BLOCK_LENGTH };
//     gameState.players[id].velocity = { x: 0, y: 0 };
//   });
// };

const checkWin = (gameId) => {
  let gameState = allGames[gameId];
  Object.keys(gameState.players).forEach((id) => {
    if (gameState.players[id].score >= WINNING_SCORE) {
      gameState.winner = id;
      if (gameState.ongoing) addStats(gameId);
      gameState.ongoing = false;
    }
  });
};

const addStats = (gameId) => {
  let gameState = allGames[gameId];
  User.findById(gameState.winner).then((user) => {
    if (user) {
      User.findByIdAndUpdate(gameState.winner, { wins: user.wins + 1 }).then((user) =>
        console.log(user)
      );
    }
  });
  Object.keys(gameState.players).forEach((id) => {
    User.findById(id).then((user) => {
      if (user) {
        User.findByIdAndUpdate(id, { $set: { games: user.games + 1 } }).then((user) =>
          console.log(user)
        );
      }
    });
  });
};

const spawnCorn = (gameId) => {
  let gameState = allGames[gameId];
  const getSpawnLocation = () => {
    let valid = false;
    let row, col;
    while (!valid) {
      row = Math.floor(Math.random() * MAP_ARRAY_LENGTH);
      col = Math.floor(Math.random() * MAP_ARRAY_LENGTH);
      valid = gameState.array[row][col] == ".";
    }
    return [row, col];
  };
  if (gameState.corn < CORN_NUM) {
    let pos = getSpawnLocation();
    let rand = Math.floor(Math.random() * 100);
    let type;
    if (rand < 60) {
      type = -1;
      gameState.reg.push({ x: BLOCK_LENGTH * pos[1], y: BLOCK_LENGTH * pos[0] });
    } else if (rand < 80) {
      type = -2;
      gameState.speed.push({ x: BLOCK_LENGTH * pos[1], y: BLOCK_LENGTH * pos[0] });
    } else {
      type = -3;
      gameState.slow.push({ x: BLOCK_LENGTH * pos[1], y: BLOCK_LENGTH * pos[0] });
    }
    gameState.map[BLOCK_LENGTH * pos[0]][BLOCK_LENGTH * pos[1]] = type;
    gameState.corn += 1;
  }
};

const playerCollectCorn = (gameId) => {
  let gameState = allGames[gameId];
  Object.keys(gameState.players).forEach((id) => {
    if (gameState.players[id] != undefined) {
      for (let corn in gameState.reg) {
        let hasScored = intersect(
          gameState.players[id].position,
          40,
          40,
          gameState.reg[corn],
          BLOCK_LENGTH,
          BLOCK_LENGTH
        );
        if (hasScored) {
          gameState.players[id].score += 1;
          gameState.map[gameState.reg[corn].y][gameState.reg[corn].x] = "0";
          gameState.corn -= 1;
          delete gameState.reg[corn];
        }
      }
    }
  });
};

const timerCountdown = () => {
  Object.keys(allGames).forEach((gameId) => {
    let gameState = allGames[gameId];
    gameState.timer -= 1;
  });
};

module.exports = {
  allGames,
  userToGameMap,
  createRoom,
  updateGameState,
  spawnPlayer,
  removePlayer,
  movePlayer,
  stopMovePlayer,
  timerCountdown,
};
