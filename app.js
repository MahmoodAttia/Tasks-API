const express = require("express");
require("dotenv").config();
require("express-async-errors");
const errorHandler = require("./middleware/error-handler");
const connectToDb = require("./db/connect-db");
const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
const authMiddlerware = require("./middleware/authMiddleware");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const app = express();
app.use(express.json());
app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(helmet());
app.use(xss());
app.use(cors());

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
