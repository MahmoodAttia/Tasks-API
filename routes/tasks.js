const express = require("express");
const router = express.Router();

const {
  getTask,
  getTasks,
  updateTask,
  deleteTask,
  createTask,
} = require("../controllers/tasks");

router.route("/").get(getTasks).post(createTask);
router.route("/:id").post(deleteTask).patch(updateTask).get(getTask);

module.exports = router;
