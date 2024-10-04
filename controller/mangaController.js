const Manga = require("../models/manga");
const { body, validationResult, check } = require("express-validator");
const flash = require("connect-flash");
const fs = require("fs");
const path = require("path");

// get all manga from database
exports.getManga = async () => {
  try {
    const manga = await Manga.find();
    return manga;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// get manga by id
exports.showManga = async (judul) => {
  try {
    const getMangabyId = Manga.findOne({ judul: judul });
    if (!getMangabyId) {
      console.log("No manga with name " + judul + " found!");
    }
    return getMangabyId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// add new manga to the database
exports.addManga = async (req, res) => {
  try {
    const newManga = new Manga({
      judul: req.body.judul,
      genre: req.body.genre,
      author: req.body.author,
      status: req.body.status,
      gambar: req.file ? req.file.filename : "", // Save the filename from the uploaded file
    });

    await newManga.save();
  } catch (error) {
    console.error("Failed to store the data!", error);
    throw error;
  }
};

// update manga to the database
exports.updateManga = async (req, res) => {
  try {
    // Find the existing manga data
    const existingManga = await Manga.findOne({ _id: req.params.id });
    if (!existingManga) {
      return res.status(404).json({ message: "Manga not found!" });
    }

    // Determine the new image filename
    const newImage = req.file ? req.file.filename : null;
    const oldImage = existingManga.gambar;

    // If a new image is uploaded, delete the old image from the images folder
    if (newImage && oldImage) {
      const oldImagePath = path.join(__dirname, "../public/images", oldImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image
      }
    }

    // Update the manga data
    const manga = await Manga.updateOne(
      { _id: req.params.id },
      {
        $set: {
          judul: req.body.judul,
          genre: req.body.genre,
          author: req.body.author,
          status: req.body.status,
          gambar: newImage ? newImage : oldImage, // Use new image if uploaded, otherwise use old image
        },
      }
    );

    return manga;
  } catch (error) {
    console.error("Failed to update the data!", error);
  }
};

// delete manga from the database
exports.deleteManga = async (req, res) => {
  try {
    const manga = Manga.deleteOne({ judul: req.params.judul });
    if (!manga) {
      console.log(`No Manga with title: ${manga} found!`);
    }
    return manga;
  } catch (error) {
    console.error("Failed to delete the data!", error);
  }
};
