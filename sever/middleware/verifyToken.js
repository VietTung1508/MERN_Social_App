const verifyToken = (req, res, next) => {
  let token = req.header("Authentication");

  if (!token) res.status(403).send("ACEES DENIED");

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  const verified = jwt.verify(token, process.env.TOKEN_PASSWORD);
  req.user = verified;

  next();
};

module.exports = verifyToken;
