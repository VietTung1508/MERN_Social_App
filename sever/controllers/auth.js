const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user.js");

const register = async (req, res, next) => {
  const user = req.body;
  const { password } = req.body;

  try {
    emailExist = await User.findOne({ email: user.email }).select("+password");

    if (emailExist)
      return res.status(500).json({ message: "Email is already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      ...user,
      password: hash,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).select("+password");
    if (!user)
      return res
        .status(401)
        .json({ message: "Email or Password is not valid" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Email or Password is not valid" });

    const accessToken = jwt.sign({ id: user._id }, process.env.TOKEN_PASSWORD);

    delete user.password;

    res.status(200).json({ user, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

const logout = (req, res, next) => {};

module.exports = {
  register,
  login,
  logout,
};
