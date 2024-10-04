const mongoose = require("mongoose");

const Manga = mongoose.model("Manga", {
  judul: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  gambar: {
    type: String,
    required: true,
  },
});

module.exports = Manga;
