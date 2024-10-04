const Contact = require("../models/contact");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");

// get all the contact
exports.getContact = async () => {
  try {
    const contact = await Contact.find();
    return contact;
  } catch (error) {
    console.log("Failed to fetch the data!", error);
    throw error;
  }
};

// add new contact to the database
exports.addContact = async (req, res) => {
  try {
    const newContact = new Contact({
      nama: req.body.nama,
      alamat: req.body.alamat,
      email: req.body.email,
      notelp: req.body.notelp,
    });

    await newContact.save();
  } catch (error) {
    console.error("Failed to add contact!", error);
  }
};

// show contact by id
exports.showContact = async (nama) => {
  try {
    const getContactId = await Contact.findOne({ nama });
    if (!getContactId) {
      console.log(`No contact with name ${nama} found!`);
    }
    return getContactId;
  } catch (error) {
    console.error("Failed to get the data!", error);
  }
};

// update contact to the database
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.updateOne(
      { _id: req.params.id },
      {
        $set: {
          nama: req.body.nama,
          alamat: req.body.alamat,
          email: req.body.email,
          notelp: req.body.notelp,
        },
      }
    );

    return contact;
  } catch (error) {
    console.error("Failed to update the data!", error);
  }
};

// delete contact from the database
exports.deleteContact = async (id) => {
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      console.log(`No contact with ID ${id} found!`);
    }
    return contact;
  } catch (error) {
    console.error("Failed to delete the data!", error);
  }
};
