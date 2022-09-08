const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 10,
      maxlength: 100,
      required: [true, "Please provide task title"],
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 500,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: [true, "Please provide task user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Task", TaskSchema);
