const getTasks = async (req, res) => {
  res.status(200).json({ msg: "getTasks" });
};
const getTask = async (req, res) => {
  res.status(200).json({ msg: "getTask" });
};

const updateTask = async (req, res) => {
  res.status(200).json({ msg: "updateTask" });
};
const deleteTask = async (req, res) => {
  res.status(200).json({ msg: "deleteTask" });
};
const createTask = async (req, res) => {
  res.status(200).json({ msg: "createTask" });
};

module.exports = {
  getTask,
  getTasks,
  deleteTask,
  updateTask,
  createTask,
};
