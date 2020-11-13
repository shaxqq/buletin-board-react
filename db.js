const mongoose = require("mongoose");
require('dotenv').config()

// mongodb+srv://sazeke:sazekeL1@cluster0.nv88g.mongodb.net/informationSupport?retryWrites=true&w=majority

mongoose
  .connect(process.env.MONGODB_URI || 
    "mongodb://localhost/bulletinboard",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
