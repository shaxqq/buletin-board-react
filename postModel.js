const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostModel = new Schema(
  {
    city: { type: String },
    title: { type: String },
    content: { type: String },
    date: { type: String, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostModel);
