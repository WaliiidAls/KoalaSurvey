const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const Auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "SessionID missing" });
  }
  const flag = jwt.verify(token, process.env.SECRET);
  if (!flag) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Bad SessionID format" });
  }
  next();
};

module.exports = {
  Auth,
};
