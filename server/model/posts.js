const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  titulo: { type: String, require: true },
  autor: { type: String, require: true },
  imagen: { type: String, require: true },
  categoria: { type: String, require: true },
  fecha: { type: String, require: true },
  texto: { type: String, require: true }
});

module.exports = mongoose.model("Post", postSchema);
