const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.status(200).json({ message: "it is work" });
});

app.use((req, res, next) => {
  const error = new Error("Not Found, I creat this message");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message
  });
});

module.exports = app;
