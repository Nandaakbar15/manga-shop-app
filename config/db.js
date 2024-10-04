const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/manga-shop");

// mencoba membuat schema / model
// const Manga = mongoose.model("Manga", {
//   judul: {
//     type: String,
//     required: true,
//   },
//   genre: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//   },
//   gambar: {
//     type: String,
//     required: true,
//   },
// });

// menambahkan data
// const manga1 = new Manga({
//   judul: "Dragon Ball",
//   genre: "Action",
//   author: "Akira Toriyama",
//   status: "Completed",
//   gambar: "dragonball.jpg",
// });

// manga1.save().then((result) => {
//   console.log(result);
// });

// const Contact = mongoose.model("Contact", {
//   nama: {
//     type: String,
//     required: true,
//   },
//   alamat: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   notelp: {
//     type: String,
//     required: true,
//   },
// });

// const contact1 = new Contact({
//   nama: "Alvinda Akbar",
//   alamat: "Cimahi",
//   email: "alvindaakbar@gmail.com",
//   notelp: "081818132011",
// });

// contact1.save().then((result) => {
//   console.log(result);
// });

// const user1 = new User({
//   username: "admin",
//   email: "admin@gmail.com",
//   password: "123",
//   role: "admin",
// });

// user1.save().then((result) => {
//   console.log(result);
// });
