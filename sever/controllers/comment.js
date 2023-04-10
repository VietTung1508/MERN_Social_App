const { Comment, childComment } = require("../model/comment.js");
const Post = require("../model/post.js");
const mongoose = require("mongoose");

const create = async (req, res) => {
  const { postId } = req.params;
  const comment = req.body;
  try {
    const post = await Post.findById(postId);
    const newComment = new Comment(comment);
    post.comments.push(newComment);
    await newComment.save();
    await post.save();
    res.status(200).json(newComment);
  } catch (e) {
    res.status(500).json(e);
  }
};

const createChild = async (req, res) => {
  const { commentId } = req.params;
  const nestedComment = req.body;
  try {
    const parentComment = await Comment.findById(commentId);
    const newChildComment = new childComment(nestedComment);
    parentComment.childComments.push(newChildComment);
    await parentComment.save();
    await newChildComment.save();
    res.status(200).json("Success");
  } catch {}
};

const edit = async (req, res) => {
  const { commentId } = req.params;
  const comment = req.body;
  const { isChild } = req.query;
  const ObjectId = new mongoose.Types.ObjectId(commentId);
  try {
    if (isChild === "true") {
      const child = await childComment.findById(commentId);

      await Comment.findByIdAndUpdate(
        child.parentId,
        {
          $set: {
            "childComments.$[field].content": comment.content,
          },
        },
        {
          arrayFilters: [
            {
              "field._id": ObjectId,
            },
          ],
        }
      );
      await childComment.findByIdAndUpdate(commentId, {
        $set: { content: comment.content },
      });
    } else {
      await Comment.findByIdAndUpdate(commentId, {
        $set: {
          content: comment.content,
        },
      });
    }
    res.status(200).json("Success Fully Edit Comment");
  } catch (e) {
    res.status(500).json(e);
  }
};

const destroy = async (req, res) => {
  const { commentId } = req.params;
  const { isChild } = req.query;
  try {
    if (isChild === "true") {
      const child = await childComment.findById(commentId);
      await Comment.findByIdAndUpdate(child.parentId, {
        $pull: { childComments: { _id: commentId } },
      });
      await childComment.findByIdAndDelete(commentId);
    } else {
      await Comment.findByIdAndDelete(commentId);
      await childComment.deleteMany({ parentId: commentId });
    }

    res.status(200).json("Delete Successfully");
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  create,
  createChild,
  edit,
  destroy,
};
