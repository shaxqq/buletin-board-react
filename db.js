const mongoose = require("mongoose");
require('dotenv').config()

// heroku config:set MONGODB_URI="mongodb+srv://sazeke:sazekeL1@cluster0.nv88g.mongodb.net/informationSupport?retryWrites=true&w=majority"

mongoose
  .connect(process.env.MONGODB_URI || 
    "mongodb+srv://sazeke:sazekeL1@cluster0.nv88g.mongodb.net/informationSupport?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
