require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(8000, () => console.log("Server running on port 8000"));
  })
  .catch(err => console.error(err));
