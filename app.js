const express = require("express");
require("dotenv").config();
require("express-async-errors");
const errorHandler = require("./middleware/error-handler");
const connectToDb = require("./db/connect-db");
const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
const authMiddlerware = require("./middleware/authMiddleware");
const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", authMiddlerware, tasksRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectToDb(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server started with port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
