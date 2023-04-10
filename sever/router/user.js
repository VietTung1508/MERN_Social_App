const express = require("express");
const route = express.Router();
const userController = require("../controllers/user.js");

route.get("/:id", userController.getUser);
route.post("/:id", userController.savePin);

module.exports = route;
