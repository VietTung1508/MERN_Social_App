const express = require("express");
const postControllers = require("../controllers/post.js");
const route = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary/index.js");
const upload = multer({ storage });

route.get("/", postControllers.getPosts);
route.get("/:id", postControllers.detail);
route.post("/:userId", upload.single("image"), postControllers.createPost);
route.put("/:id", postControllers.update);
route.delete("/:id", postControllers.destroy);

module.exports = route;

