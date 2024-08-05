require("dotenv").config();
const cofig = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(cofig.connectionString);

const User = require("./models/user.model");

const express = require("express");
const cors = require("cors");

const app = express();

const jwt = require("jsonwebtoken");

const { authenticateToken } = require("./utilities");
// middle ware
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
// tset API
app.get("/", (req, res) => {
  res.json({
    data: "hello",
  });
});

// create Account API
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is require" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is require" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is require" });
  }
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User Already Exits",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });
  return res.json({
    error: false,
    user,
    accessToken,
    message: "Register Successful",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Error Handling
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email });

  if (!userInfo) {
    return res.status(400).json({ message: "User Not Found" });
  }

  if (userInfo.email && userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000",
    });
    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invaild Credentials",
    });
  }
});

app.listen(8000);

module.exports = app;
