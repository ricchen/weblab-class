const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  pfp: String,
  wins: Number,
  games: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
