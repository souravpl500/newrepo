const express = require("express");
const { connection } = require("./Configs/db");
const { postRouter } = require("./Routes/Post.route");
const PORT = process.env.port;
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});

app.use("/", postRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at PORT : ${PORT} `);
});
