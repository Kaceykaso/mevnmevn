// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import TodoListRoutes from "./routes/api/TodoList.js";
import homeRouter from "./routes/homeRouter.js";
import assetsRouter from "./routes/assetsRouter.js";

const app = express();
const publicPath = path.join(path.resolve(), "../client/public"); // public assets file path
const distPath = path.join(path.resolve(), "../client/dist"); // production assets file path

dotenv.config();

app.use(cors()); // to allow cross origin requests
app.use(bodyParser.json()); // to convert the request into JSON
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-

// Connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

// Create route
// Assets path based on the environment running
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(distPath));
} else {
  app.use("/", express.static(publicPath));
  app.use("/src", assetsRouter);
}
app.use("/api/todoList", TodoListRoutes);
app.use(homeRouter);

app.listen(process.env.PORT, () =>
  console.log(`App is running on http://localhost:${process.env.PORT}`)
);