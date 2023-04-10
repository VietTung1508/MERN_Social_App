const { Comment, childComment } = require("./model/comment.js");
const Post = require("./model/post.js");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/social_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("db connected");
});

const categories = [
  {
    img: "https://i.pinimg.com/474x/23/dd/93/23dd932e24c1709f5f69710a19ad819c.jpg",
    cate: "Cars",
  },
  {
    img: "https://i.pinimg.com/474x/42/72/e1/4272e100cfbabbbd64c20ae1a111726a.jpg",
    cate: "Anime",
  },
  {
    img: "https://i.pinimg.com/474x/dd/97/62/dd97627217ce79e5ae7afe13428c1c99.jpg",
    cate: "Japan",
  },
  {
    img: "https://i.pinimg.com/474x/b5/3e/1c/b53e1c921aca9e6a105a8e1bb5e0bd7f.jpg",
    cate: "Nature",
  },
  {
    img: "https://i.pinimg.com/474x/e2/fd/29/e2fd291b8d860f5de90fbfc195edfe44.jpg",
    cate: "Gaming",
  },

  {
    img: "https://i.pinimg.com/474x/16/38/44/163844c229331ee646efb57779f85a5f.jpg",
    cate: "Animal",
  },

  {
    img: "https://i.pinimg.com/474x/6d/e8/9c/6de89c703f7ee7057ec94f846d1e352e.jpg",
    cate: "Rock",
  },
  {
    img: "https://i.pinimg.com/474x/70/5c/b5/705cb546472241c614f9494549a56894.jpg",
    cate: "Japan",
  },
  {
    img: "https://i.pinimg.com/474x/6a/1b/d2/6a1bd292ab284a9c5c984f35e95035d3.jpg",
    cate: "Anime",
  },
  {
    img: "https://i.pinimg.com/474x/1f/d2/fa/1fd2fa8130e2837c9688c58a9398d3f5.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/f6/9b/4f/f69b4f3bb20fc63f5a43b9b7b4278b51.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/5d/60/52/5d6052dbd37839ad77b569e436829b55.jpg",
    cate: "Anime",
  },
  {
    img: "https://i.pinimg.com/474x/11/ce/ba/11ceba1d1616d97186923ac34a83bf31.jpg",
    cate: "Girl",
  },
  {
    img: "https://i.pinimg.com/474x/9d/99/4e/9d994e04f7b78b8c74d095d90c65af8a.jpg",
    cate: "Girl",
  },
  {
    img: "https://i.pinimg.com/474x/b6/ec/22/b6ec222e5799b6e5c182cfeecefb5b0c.jpg",
    cate: "Girl",
  },
  {
    img: "https://i.pinimg.com/474x/f9/e9/a1/f9e9a1f5617788dff77dc243732c31be.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/1f/40/64/1f40649780bd05551b1951cf54de10cf.jpg",
    cate: "Anime",
  },
  {
    img: "https://i.pinimg.com/474x/36/13/9e/36139ee02410d4d7cf39be26c297bdd2.jpg",
    cate: "Rock",
  },
  {
    img: "https://i.pinimg.com/474x/d1/ab/bb/d1abbb660e84cf98c04fe7e9b4c7ff17.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/85/8a/b8/858ab86aacc86199d13b505bb45acf5f.jpg",
    cate: "Anime",
  },
  {
    img: "https://i.pinimg.com/474x/50/ce/49/50ce4984e67483722ba1547c70909180.jpg",
    cate: "Japan",
  },
  {
    img: "https://i.pinimg.com/474x/48/42/9d/48429d82146bec2b1b6ffe7941bbf401.jpg",
    cate: "Girl",
  },
  {
    img: "https://i.pinimg.com/474x/3e/bd/ce/3ebdcef5d7ab408c90f61f8a426e7b03.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/95/6d/15/956d156dce8e08177e9ca5703119dc57.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/74/1d/aa/741daa47ce94c22074029552a0cff74b.jpg",
    cate: "Rock",
  },
  {
    img: "https://i.pinimg.com/474x/08/ef/3c/08ef3cbc004d72fdbaa12b1c318692a1.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/14/1b/83/141b83cad7fe34e20e605ec05f4f4c61.jpg",
    cate: "Cars",
  },
  {
    img: "https://i.pinimg.com/474x/57/21/dd/5721dd626ce2ae15c0f4fd10a9b11fae.jpg",
    cate: "Cars",
  },
  {
    img: "https://i.pinimg.com/474x/e0/3e/99/e03e99851207e3aedb683699c4641f16.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/55/5c/2c/555c2c92c69d53b9db63dfcf5e5b7141.jpg",
    cate: "Anime",
  },
  {
    img: "https://i.pinimg.com/474x/49/aa/84/49aa841aca510cc3e530b86fb40ccfe8.jpg",
    cate: "Anime",
  },
  {
    img: "https://i.pinimg.com/474x/17/98/35/179835c469e8812b26b4d2d315cacc9b.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/e7/08/97/e70897196311e0d93528c729f67cfde5.jpg",
    cate: "Fashion",
  },
  {
    img: "https://i.pinimg.com/474x/85/51/2d/85512d724d5aea56de1f03b2abafdd9b.jpg",
    cate: "Anime",
  },
  {
    img: "https://i.pinimg.com/474x/3a/21/b7/3a21b761ffc05b6508660a4e09d5d0f2.jpg",
    cate: "Rock",
  },
  {
    img: "https://i.pinimg.com/474x/fa/33/cd/fa33cdffa5b7aa26676db64b4f8f87f7.jpg",
    cate: "Rock",
  },
  {
    img: "https://i.pinimg.com/474x/b5/5e/98/b55e98ed3a8c88039d4b4e5b197ef6f9.jpg",
    cate: "Rock",
  },
  {
    img: "https://i.pinimg.com/474x/a1/3e/4f/a13e4f707251d6331494d23097db5559.jpg",
    cate: "Rock",
  },
  {
    img: "https://i.pinimg.com/474x/13/15/cc/1315cc11d6e28d892a7e8493c7298eca.jpg",
    cate: "Cars",
  },
  {
    img: "https://i.pinimg.com/474x/f7/10/18/f71018f0f1e3272e9271fbf364d38dcb.jpg",
    cate: "Girl",
  },
];

const deleteComment = async () => {
  await Comment.deleteMany({});
  await childComment.deleteMany({});
};

const createPost = async () => {
  await Post.deleteMany({});
  for (let i = 0; i < categories.length; i++) {
    const post = new Post({
      title: "Black Lagon",
      content: "Will Black Lagon gonna be the best manga ever",
      author: "6421243b06c6431e5e2a6311",
      image: {
        url: `${categories[i].img}`,
        filename: `undefined`,
      },
      category: `${categories[i].cate.toLowerCase()}`,
    });

    await post.save();
  }
};
deleteComment();
createPost().then(() => {
  mongoose.connection.close();
});
