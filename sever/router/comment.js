const express = require("express");
const route = express.Router();
const commentController = require("../controllers/comment.js");

route.post("/:postId", commentController.create);
route.post("/:commentId/child", commentController.createChild);
route.post("/:commentId/likeComment", commentController.likeComment);
route.put("/:commentId", commentController.edit);
route.delete("/:commentId", commentController.destroy);

module.exports = route;
