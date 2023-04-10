const express = require("express");
const route = express.Router();
const auth = require("../controllers/auth.js");
const validate = require("../middleware/validation.js");

route.post("/register", validate.validationUser, auth.register);

route.post("/login", auth.login);

route.post("/logout", auth.logout);

module.exports = route;
