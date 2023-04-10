const User = require("../model/user.js");
const Post = require("../model/post.js");

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .populate("savedPin")
      .populate({ path: "savedPin", populate: { path: "author" } });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};

const savePin = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    const user = await User.findById(userId);
    const isSaved = user.savedPin.includes(post._id);
    if (isSaved) {
      const removeIndex = user.savedPin.indexOf(post._id);
      user.savedPin.splice(removeIndex, 1);
      await user.save();
    } else {
      user.savedPin.push(post);
      await user.save();
    }
    res.status(200).json("save Success");
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  getUser,
  savePin,
};
