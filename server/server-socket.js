const gameLogic = require("./game-logic");

let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const sendGameState = () => {
  io.emit("update", gameLogic.allGames);
};

const startRunningGame = () => {
  setInterval(() => {
    gameLogic.updateGameState();
    sendGameState();
  }, 1000 / 60); // 60 frames per second
};

const startTimer = () => {
  setInterval(() => {
    gameLogic.timerCountdown();
  }, 1000);
};

const getActiveUsers = () => {
  setInterval(() => {
    io.emit("activeUsers", gameLogic.userToGameMap);
  }, 1000);
};

getActiveUsers();
startRunningGame();
startTimer();

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // FIXME: is this the behavior you want?
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
};

const removeUser = (user, socket) => {
  if (user) delete userToSocketMap[user._id];
  delete socketToUserMap[socket.id];
};

const addUserToRoom = (roomId, userId) => {
  gameLogic.spawnPlayer(roomId, userId);
  io.emit("activeUsers", gameLogic.userToGameMap);
};

const removePlayerFromRoom = (userId) => {
  gameLogic.removePlayer(userId);
  io.emit("activeUsers", gameLogic.userToGameMap);
};

const startGame = (roomId) => {
  if (roomId) {
    gameLogic.allGames[roomId].timer = 120;
    io.emit("startGame", roomId);
  }
};
module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
      socket.on("move", (dir) => {
        // Listen for moves from client and move player accordingly
        const user = getUserFromSocketID(socket.id);
        if (user) gameLogic.movePlayer(user._id, dir);
      });
      socket.on("stopMove", (dir) => {
        // Listen for moves from client and move player accordingly
        const user = getUserFromSocketID(socket.id);
        if (user) gameLogic.stopMovePlayer(user._id, dir);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,
  addUserToRoom: addUserToRoom,
  removePlayerFromRoom: removePlayerFromRoom,
  startGame: startGame,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getIo: () => io,
};
