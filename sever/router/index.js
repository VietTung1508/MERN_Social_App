const authRoute = require("./auth.js");
const postRoute = require("./post.js");
const commentRoute = require("./comment.js");
const userRoute = require("./user.js");

const router = (app) => {
  app.use("/auth", authRoute);
  app.use("/posts", postRoute);
  app.use("/comments", commentRoute);
  app.use("/users", userRoute);
};

module.exports = router;
