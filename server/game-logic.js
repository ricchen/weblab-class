const { intersect, collisionVector } = require("./collision");

const User = require("./models/user");
const Room = require("./models/gameRoom");
const Lobby = require("./lobbies");

// MazeBuilder = require("./maze-builder");

/** constants */
const WIDTH = 10;
const LENGTH = 10;
const MAP_LENGTH = 500;
const MAP_ARRAY_LENGTH = 2 * WIDTH + 1;
const BLOCK_LENGTH = 50;
const INITIAL_RADIUS = 20;
const PLAYER_SPEED = 10;
const WINNING_SCORE = 1;
const colors = ["blue", "green", "purple", "orange", "silver"]; // colors to use for players

const userToGameMap = {}; // maps user ID to Game

/** Utils! */

const allGames = {};
const initArray = (value) => {
  return new Array(rows).fill().map(() => new Array(cols).fill(value));
};

const rand = (min, max) => {
  return min + Math.floor(Math.random() * (1 + max - min));
};

const posToSpace = (x) => {
  return 2 * (x - 1) + 1;
};

const posToWall = (x) => {
  return 2 * x;
};

const inBounds = (r, c) => {
  if (typeof mapArray[r] == "undefined" || typeof mapArray[r][c] == "undefined") {
    return false; // out of bounds
  }
  return true;
};

const shuffle = (array) => {
  // sauce: https://stackoverflow.com/a/12646864
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const partition = (r1, r2, c1, c2) => {
  // create partition walls
  // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

  let horiz, vert, x, y, start, end;

  if (r2 < r1 || c2 < c1) {
    return false;
  }

  if (r1 == r2) {
    horiz = r1;
  } else {
    x = r1 + 1;
    y = r2 - 1;
    start = Math.round(x + (y - x) / 4);
    end = Math.round(x + (3 * (y - x)) / 4);
    horiz = rand(start, end);
  }

  if (c1 == c2) {
    vert = c1;
  } else {
    x = c1 + 1;
    y = c2 - 1;
    start = Math.round(x + (y - x) / 3);
    end = Math.round(x + (2 * (y - x)) / 3);
    vert = rand(start, end);
  }

  for (let i = posToWall(r1) - 1; i <= posToWall(r2) + 1; i++) {
    for (let j = posToWall(c1) - 1; j <= posToWall(c2) + 1; j++) {
      if (i == posToWall(horiz) || j == posToWall(vert)) {
        mapArray[i][j] = "B";
      }
    }
  }

  let gaps = shuffle([true, true, true, false]);

  // create gaps in partition walls

  if (gaps[0]) {
    let gapPosition = rand(c1, vert);
    mapArray[posToWall(horiz)][posToSpace(gapPosition)] = [];
  }

  if (gaps[1]) {
    let gapPosition = rand(vert + 1, c2 + 1);
    mapArray[posToWall(horiz)][posToSpace(gapPosition)] = [];
  }

  if (gaps[2]) {
    let gapPosition = rand(r1, horiz);
    mapArray[posToSpace(gapPosition)][posToWall(vert)] = [];
  }

  if (gaps[3]) {
    let gapPosition = rand(horiz + 1, r2 + 1);
    mapArray[posToSpace(gapPosition)][posToWall(vert)] = [];
  }

  // recursively partition newly created chambers

  partition(r1, horiz - 1, c1, vert - 1);
  partition(horiz + 1, r2, c1, vert - 1);
  partition(r1, horiz - 1, vert + 1, c2);
  partition(horiz + 1, r2, vert + 1, c2);
};

const isGap = (...cells) => {
  return cells.every((array) => {
    let row, col;
    [row, col] = array;
    if (mapArray[row][col].length > 0) {
      if (!mapArray[row][col].includes("W")) {
        return false;
      }
    }
    return true;
  });
};

const cols = 2 * WIDTH + 1;
const rows = 2 * LENGTH + 1;

let mapArray = initArray(".");

// place initial walls
mapArray.forEach((row, r) => {
  row.forEach((cell, c) => {
    switch (r) {
      case 0:
      case rows - 1:
        mapArray[r][c] = "b";
        break;

      default:
        if (r % 2 == 1) {
          if (c == 0 || c == cols - 1) {
            mapArray[r][c] = "b";
          }
        } else if (c % 2 == 0) {
          mapArray[r][c] = "b";
        }
    }
  });

  // if (r == 0) {
  //   // place exit in top row
  //   let doorPos = posToSpace(rand(1, WIDTH));
  //   mapArray[r][doorPos] = ["door", "exit"];
  // }

  if (r == rows - 1) {
    // place entrance in bottom row
    let doorPos = posToSpace(rand(1, WIDTH));
    mapArray[r][doorPos] = "W";
  }
});

// start partitioning
partition(1, LENGTH - 1, 1, WIDTH - 1);
// const mapArray = [
//   "B.BBBBBBBB",
//   "B.B...B..W",
//   "B.B.B.B.BB",
//   "B.B.B.B.BB",
//   "B.B.B.B.BB",
//   "B.B.B.B.BB",
//   "B.B.B.B.BB",
//   "B.B.B.B.BB",
//   "B...B...BB",
//   "BBBBBBBBBB",
// ];

const findWalls = (array) => {
  const wallCoords = [];
  for (var j = 0; j < MAP_ARRAY_LENGTH; j++) {
    for (var i = 0; i < MAP_ARRAY_LENGTH; i++) {
      if (array[j][i] == "B" || array[j][i] == "b") {
        wallCoords.push({ x: 50 * i, y: 50 * j });
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
        winCoords.push({ x: 50 * i, y: 50 * j });
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
        row[50 * i] = getWallNumber(array, j, i);
      } else if (array[j][i] == "W") {
        row[50 * i] = -1;
      } else {
        row[50 * i] = 0;
      }
    }
    map[50 * j] = row;
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
const createRoom = (gameId) => {
  allGames[gameId] = {
    winner: null,
    players: {},
    map: arrayToMap(mapArray),
    walls: findWalls(mapArray),
    win: findWin(mapArray),
    color: colors[Math.floor(Math.random() * colors.length)],
    ongoing: true,
  };
};

/** Game logic */

const spawnPlayer = (gameId, id) => {
  if (!id) return;
  userToGameMap[id] = gameId;
  let gameState = allGames[gameId];
  gameState.players[id] = {
    position: { x: 50, y: 50 },
    velocity: { x: 0, y: 0 },
    score: 0,
  };
  // console.log("spawned");
  // if (gameId in Lobby.activeLobbies) {
  //   Lobby.activeLobbies[gameId].push(id);
  // } else {
  //   Lobby.activeLobbies[gameId] = [id];
  // }
  // console.log(Lobby.activeLobbies);
};

const updateGameState = () => {
  Object.keys(allGames).forEach((gameId) => {
    checkWin(gameId);
    updatePlayerPositions(gameId);
    detectCollisions(gameId);
    checkScorePoint(gameId);
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

const checkScorePoint = (gameId) => {
  let gameState = allGames[gameId];
  Object.keys(gameState.players).forEach((id) => {
    if (gameState.players[id] != undefined) {
      gameState.win.forEach((win) => {
        let hasScored = intersect(
          gameState.players[id].position,
          40,
          40,
          win,
          BLOCK_LENGTH,
          BLOCK_LENGTH
        );
        if (hasScored) {
          gameState.players[id].score += 1;
          console.log(id);
          console.log("scored");
          console.log(gameState.players[id].score);
          startNewMap(gameId);
          return;
        }
      });
    }
  });
};

const startNewMap = (gameId) => {
  let gameState = allGames[gameId];
  gameState.map = arrayToMap(mapArray);
  gameState.walls = findWalls(mapArray);
  gameState.win = findWin(mapArray);
  gameState.color = colors[Math.floor(Math.random() * colors.length)];
  resetPlayerPositions(gameId);
};

const resetPlayerPositions = (gameId) => {
  let gameState = allGames[gameId];
  Object.keys(gameState.players).forEach((id) => {
    gameState.players[id].position = { x: 50, y: 50 };
    gameState.players[id].velocity = { x: 0, y: 0 };
  });
};

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

module.exports = {
  allGames,
  userToGameMap,
  createRoom,
  updateGameState,
  spawnPlayer,
  removePlayer,
  movePlayer,
  stopMovePlayer,
};
