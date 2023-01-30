/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Room = require("./models/gameRoom");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const gameLogic = require("./game-logic.js");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/createRoom", auth.ensureLoggedIn, (req, res) => {
  Room.findOne({ room_id: req.body.roomId }).then((room) => {
    if (room) {
      res.send({ msg: "Room already exists" });
    } else {
      const room = new Room({
        room_id: req.body.roomId,
        players: [req.user._id],
      });
      room
        .save()
        .then(gameLogic.createRoom(req.body.roomId))
        .then(socketManager.addUserToRoom(req.body.roomId, req.user._id))
        .then(res.send({ msg: "Success" }));
    }
  });
});

router.post("/joinRoom", auth.ensureLoggedIn, (req, res) => {
  //roomId
  Room.findOne({ room_id: req.body.roomId }).then((room) => {
    if (room) {
      if (room.players.length < 2) {
        Room.replaceOne(
          { room_id: req.body.roomId },
          { room_id: req.body.roomId, players: room.players.concat([req.user._id]) }
        )
          .then(() => {
            socketManager.addUserToRoom(req.body.roomId, req.user._id);
          })
          .then(res.send({ msg: "Success" }));
      } else {
        res.send({ msg: "Room Full" });
      }
    } else {
      res.send({ msg: "Room Not Found" });
    }
  });
});

router.get("/activeUsers", (req, res) => {
  res.send(gameLogic.userToGameMap);
});

router.get("/verifyRoom", auth.ensureLoggedIn, (req, res) => {
  Room.findOne({ room_id: req.query.roomId }).then((room) => {
    if (room && room.players.includes(req.user._id)) {
      res.send({ msg: "ok" });
    } else {
      res.send({ msg: "bad" });
    }
  });
});

router.post("/startGame", auth.ensureLoggedIn, (req, res) => {
  if (req.body.roomId) {
    socketManager.startGame(req.body.roomId);
    res.send({ msg: "ok" });
  } else res.send({ msg: "bad" });
});

router.post("/removePlayer", auth.ensureLoggedIn, (req, res) => {
  Room.findOne({ room_id: req.body.roomId }).then((room) => {
    if (room) {
      if (room.players[0] === req.user._id) {
        if (room.players.length === 1) {
          Room.deleteOne({ room_id: req.body.roomId }).then(res.send({ msg: "Deleted Room" }));
        } else {
          Room.replaceOne(
            { room_id: req.body.roomId },
            { room_id: req.body.roomId, players: room.players.shift() }
          ).then(res.send({ msg: "Removed Player" }));
        }
      } else {
        if (room.players[1] === req.user._id) {
          Room.replaceOne(
            { room_id: req.body.roomId },
            { room_id: req.body.roomId, players: room.players.pop() }
          ).then(res.send({ msg: "Removed Player" }));
        }
      }
    } else {
      res.send({ msg: "Room not found" });
    }
  });
});

// router.post("/addStats", (req, res) => {
//   if (req.body.winner) {
//     User.findById(req.body.winner).then((user) => {
//       if (user) {
//         User.findByIdAndUpdate(req.body.winner, { wins: user.wins + 1 }).then((user) =>
//           console.log(user)
//         );
//       }
//     });
//   }
//   if (req.body.loser) {
//     User.findById(req.body.loser).then((user) => {
//       if (user) {
//         User.findByIdAndUpdate(req.body.loser, { $set: { losses: user.losses + 1 } }).then((user) =>
//           console.log(user)
//         );
//       }
//     });
//   }
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
