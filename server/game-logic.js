/** constants */
const MAP_LENGTH = 500;
const INITIAL_RADIUS = 20;
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
const gameState = {
  winner: null,
  players: {},
  map: [],
};

/** Game logic */

/** Adds a player to the game state, initialized with a random location */
const spawnPlayer = (id) => {
  gameState.players[id] = {
    position: { x: 200, y: 200 },
  };
};

/** Update the game state. This function is called once per server tick. */
// TODO (Step 2.1, pt 2): Uncomment the following function for updating the game state.
const updateGameState = () => {
  // This function is currently empty, but we'll add to it later.
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
    gameState.players[id].position.y += 10;
  } else if (dir === "down") {
    gameState.players[id].position.y -= 10;
  } else if (dir === "left") {
    gameState.players[id].position.x -= 10;
  } else if (dir === "right") {
    gameState.players[id].position.x += 10;
  }
};

module.exports = {
  gameState,
  updateGameState,
  spawnPlayer,
  removePlayer,
  movePlayer,
};
