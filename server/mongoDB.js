const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.my +
      ":" +
      process.env.pass +
      "@cluster0-ghxig.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("Connect to MongoDB-Atlas");
  })
  .catch(() => {
    console.log("DesConnect from MongoDB-Atlas");
  });
