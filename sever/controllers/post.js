const Post = require("../model/post.js");
const Category = require("../model/category.js");
const { cloudinary } = require("../cloudinary");

const getPosts = async (req, res) => {
  const { category, userId } = req.query;
  try {
    if (category) {
      const posts = await Post.find({ category: category }).populate("author");
      res.status(200).json(posts);
    } else if (userId) {
      const posts = await Post.find({ author: userId }).populate("author");
      res.status(200).json(posts);
    } else {
      const posts = await Post.find({}).populate("author");
      res.status(200).json(posts);
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  try {
    const searchPost = await Post.find({
      $or: [{ title: new RegExp(q, "i") }, { category: new RegExp(q, "i") }],
    })
      .populate("author")
      .limit(5);
    console.log(searchPost);
    res.status(200).json(searchPost);
  } catch (e) {
    res.status(500).json(e);
  }
};

const detail = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id)
      .populate("author")
      .populate({
        path: "comments",
        populate: { path: "author" },
      })
      .populate({
        path: "comments",
        populate: { path: "childComments", populate: { path: "author" } },
      });

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
};

const createPost = async (req, res) => {
  const { userId } = req.params;
  const post = req.body;
  try {
    const category = await Category.findOne({ category: post.category });
    const img = {
      url: req.file.path,
      filename: req.file.filename,
    };
    if (!category) {
      const newCate = new Category({
        category: post.category,
        image: img,
      });
      await newCate.save();
    }
    const newPost = new Post({
      ...post,
      author: userId,
      image: img,
    });
    await newPost.save();
    res.status(200).json("Create Post Successfully");
  } catch (e) {}
};

const update = async (req, res) => {
  const { id } = req.params;
  const newPost = req.body;
  try {
    await Post.findByIdAndUpdate(id, newPost);
    res.status(200).json({ msg: "Update Successfully" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    const isLastCategory = await Post.find({ category: post.category });
    if (isLastCategory.length === 1) {
      await Category.findOneAndDelete({ category: post.category });
    }
    await cloudinary.uploader.destroy(post.image.filename);
    await Post.findByIdAndDelete(id);
    res.status(200).json({ msg: "delete Successfully" });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  getPosts,
  detail,
  searchPost,
  createPost,
  update,
  destroy,
};
