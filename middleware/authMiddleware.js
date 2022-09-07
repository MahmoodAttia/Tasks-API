const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authMiddlerware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new CustomAPIError("Unauthenticated Access", 401);
  }
  const token = auth.split(" ")[1];
  if (!token) {
    throw new CustomAPIError("Unauthenticated Access", 401);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name: payload.name, userId: payload.userId };
    next();
  } catch (error) {
    throw new CustomAPIError("Unauthenticated Access", 401);
  }
};

module.exports = authMiddlerware;
