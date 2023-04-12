const express = require("express");
const route = express.Router();
const userController = require("../controllers/user.js");
const multer = require("multer");
const { storage } = require("../cloudinary/index.js");
const upload = multer({ storage });

route.get("/:id", userController.getUser);
route.post("/:id", userController.savePin);
route.put("/:userId", upload.single("avatar"), userController.edit);

module.exports = route;
