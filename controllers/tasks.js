const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/custom-error");
const Task = require("../models/task");

const getTasks = async (req, res) => {
  const { userId } = req.user;
  const task = await Task.find({ createdBy: userId }).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ msg: task, count: task.length });
};
const getTask = async (req, res) => {
  const taskId = req.params.id;
  const { userId } = req.user;
  const task = await Task.findOne({ createdBy: userId, _id: taskId });
  if (!task) {
    throw new CustomAPIError(
      `Task with id ${taskId} not found`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ msg: task });
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { userId } = req.user;
  const task = await Task.findOneAndUpdate(
    { createdBy: userId, _id: taskId },
    { ...req.body },
    { new: true }
  );
  if (!task) {
    throw new CustomAPIError(
      `Task with id ${taskId} not found`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ msg: task });
};
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const { userId } = req.user;
  const task = await Task.findOneAndDelete({ createdBy: userId, _id: taskId });
  if (!task) {
    throw new CustomAPIError(
      `Task with id ${taskId} not found`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ msg: task });
};
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.user;
  if (title === "") {
    throw new CustomAPIError("Title cannot be empty", StatusCodes.BAD_REQUEST);
  }
  const task = await Task.create({ title, description, createdBy: userId });
  res.status(StatusCodes.CREATED).json({ msg: task });
};

module.exports = {
  getTask,
  getTasks,
  deleteTask,
  updateTask,
  createTask,
};
