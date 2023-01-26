const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  room_id: String,
  players: Array,
});

// compile model from schema
module.exports = mongoose.model("room", RoomSchema);
