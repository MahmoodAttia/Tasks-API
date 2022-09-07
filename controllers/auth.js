const User = require("../models/user");
const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomAPIError(
      "Please provide email and password",
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomAPIError("Email not found", StatusCodes.NOT_FOUND);
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new CustomAPIError("Password is incorrect", StatusCodes.UNAUTHORIZED);
  }
  const token = user.generateToken();
  res.status(StatusCodes.OK).json({ name: user.name, token });
};

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateToken();
  res.status(StatusCodes.CREATED).json({ name: user.name, token });
};

module.exports = {
  login,
  register,
};
