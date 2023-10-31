const express = require("express");
const db = require("./models");

// Routes
const Users = require("./router/user");

const app = express();
app.use(express.json());

app.use("/auth", Users);

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("App Listening 5000");
  });
});