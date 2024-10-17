const express = require("express");
const router = express.Router();
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const upload = require("../config/upload");
const methodOverride = require("method-override");

router.use(flash());

router.use(methodOverride("_method"));

router.use(cookieParser("secret"));
router.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// controller manga
const {
  getManga,
  addManga,
  showManga,
  updateManga,
  deleteManga,
} = require("../controller/mangaController");

// controller contact
const {
  getContact,
  addContact,
  showContact,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

// login controller
const { login } = require("../controller/loginController");

// register controller
const { register } = require("../controller/registerController");

// default route
router.get("/", (req, res) => {
  res.redirect("/login");
});

// route untuk login
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Tatsuya Mangashop",
    layout: "login",
  });
});

// logic login
router.post("/login", async (req, res) => {
  try {
    await login(req, res);
    // res.redirect("/admin");
  } catch (error) {
    console.error("Gagal login! Email atau password salah!", error);
    res.status(404).send("Email atau password salah!");
  }
});

// route untuk register
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    layout: "register",
  });
});

// logic register
router.post("/register", register);

// halaman home untuk admin
router.get("/admin", (req, res) => {
  res.render("dashboard/layouts/home", {
    title: "Tatsuya Mangashop",
    layout: "dashboard/layouts/main",
  });
});

// halaman data manga
router.get("/datamanga", async (req, res) => {
  const manga = await getManga();
  try {
    res.render("dashboard/datamanga/index", {
      title: "Halaman Data Manga",
      layout: "dashboard/layouts/main",
      manga,
      msg: req.flash("msg"),
    });
  } catch (error) {
    console.log(error);
  }
});

// form halaman tambah data manga
router.get("/tambahmanga", (req, res) => {
  res.render("dashboard/datamanga/tambahmanga", {
    title: "Form Halaman Tambah Manga",
    layout: "dashboard/layouts/main",
  });
});

// logic tambah data manga
router.post("/addManga", upload.single("gambar"), async (req, res) => {
  try {
    await addManga(req, res);
    req.flash("msg", "Data Manga berhasil ditambah!");
    res.redirect("/datamanga");
  } catch (error) {
    console.error("Gagal menambahkan manga!", error);
    res.status(404).send("Error! Failed to add new manga!");
  }
});

// halaman form ubah Manga
router.get("/datamanga/edit/:judul", async (req, res) => {
  const manga = await showManga(req.params.judul);
  try {
    res.render("dashboard/datamanga/ubahmanga", {
      title: "Form Halaman Ubah Manga",
      layout: "dashboard/layouts/main",
      manga,
    });
  } catch (error) {
    console.error("Failed to fetch the data!", error);
  }
});

// logic ubah manga
router.put("/datamanga/edit/:id", upload.single("gambar"), async (req, res) => {
  try {
    await updateManga(req, res);
    res.redirect("/datamanga");
    req.flash("msg", "Data Manga berhasil diubah!");
  } catch (error) {
    console.error("Gagal mengubah data!", error);
    res.status(404).send("Failed to update the data!");
  }
});

// routes hapus manga
router.delete("/datamamga/delete/:id", async (req, res) => {
  try {
    await deleteManga(req.params.judul);
    req.flash("msg", "Data Manga berhasil dihapus!");
    res.redirect("/datamanga");
  } catch (error) {
    console.error("Failed to delete the data!", error);
    res.status(404).send("Gagal menghapus data!");
  }
});

// halaman contact
router.get("/datacontact", async (req, res) => {
  const contact = await getContact();
  try {
    res.render("dashboard/datacontact/index", {
      title: "Halaman Data Contact",
      layout: "dashboard/layouts/main",
      contact,
      msg: req.flash("msg"),
    });
  } catch (error) {
    console.log("Failed to get the data!", error);
  }
});

// halaman form tambah contact
router.get("/tambahcontact", (req, res) => {
  res.render("dashboard/datacontact/tambahcontact", {
    title: "Form Halaman Tambah Contact",
    layout: "dashboard/layouts/main",
  });
});

// logic tambah contact
router.post("/addContact", async (req, res) => {
  try {
    await addContact(req, res);
    req.flash("msg", "Data Contact berhasil ditambahkan!");
    res.redirect("/datacontact");
  } catch (error) {
    console.error("Gagal menambahkan contact!", error);
    req.flash("msg", "Data contact gagal ditambahkan!");
  }
});

// halaman form ubah contact
router.get("/datacontact/ubah/:nama", async (req, res) => {
  const contact = await showContact(req.params.nama);
  try {
    res.render("dashboard/datacontact/ubahcontact", {
      title: "Halaman Ubah Contact",
      layout: "dashboard/layouts/main",
      contact,
    });
  } catch (error) {
    console.error("Failed to fetch the data!", error);
  }
});

// logic ubah contact
router.put("/datacontact/edit/:id", async (req, res) => {
  try {
    await updateContact(req, res);
    req.flash("msg", "Data Contact berhasil diubah!");
    res.redirect("/datacontact");
  } catch (error) {
    console.error("Gagal mengubah data!", error);
    res.status(404).send("Failed to update the data!");
  }
});

// hapus data contact
router.delete("/datacontact/delete/:id", async (req, res) => {
  try {
    await deleteContact(req.params.id);
    req.flash("msg", "Data Contact berhasil dihapus!");
    res.redirect("/datacontact");
  } catch (error) {
    console.error("Failed to delete the data!", error);
    res.status(404).send("Gagal menghapus data!");
  }
});

// route untuk pelanggan
router.get("/pelanggan/dashboardpelanggan", (req, res) => {
  res.render("dashboardpelanggan/layouts/home", {
    title: "Tatsuya Manga Shop",
    layout: "dashboardpelanggan/layouts/main",
  });
});

// halaman daftar manga
router.get("/pelanggan/daftarmanga", async (req, res) => {
  const manga = await getManga();
  try {
    res.render("dashboardpelanggan/listmanga/viewlistmanga", {
      title: "Daftar Manga",
      layout: "dashboardpelanggan/layouts/main",
      manga,
    });
  } catch (error) {
    console.error("Failed to fetch the data!", error);
    res.status(404).send("Gagal mengambil data manga!");
  }
});

// halaman detail manga
router.get("/pelanggan/detailmanga/:judul", async (req, res) => {
  try {
    const manga = await showManga(req.params.judul);
    if (!manga) {
      return res.status(404).send("Manga not found!"); // Handle the case where manga is null
    }
    res.render("dashboardpelanggan/listmanga/detailmanga", {
      title: "Detail Manga",
      layout: "dashboardpelanggan/layouts/main",
      manga,
    });
  } catch (error) {
    console.error("Failed to fetch the data!", error);
    res.status(500).send("Internal Server Error");
  }
});

// halaman about
router.get("/pelanggan/about", (req, res) => {
  res.render("dashboardpelanggan/layouts/about", {
    layout: "dashboardpelanggan/layouts/main",
    title: "Tentang Tatsuya Manga Shop",
  });
});

// halaman contact
router.get("/pelanggan/contact", async (req, res) => {
  const contact = await getContact();
  try {
    res.render("dashboardpelanggan/contacts/viewcontact", {
      title: "Halaman Kontak",
      layout: "dashboardpelanggan/layouts/main",
      contact,
    });
  } catch (error) {
    res.status(404).send("Gagal mengambil data contact!");
    console.error("Failed to fetch the data!", error);
  }
});

module.exports = router;
