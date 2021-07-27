const express = require("express");
const pdfDB = require("./pdfDB");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//=================================================================
const storage_diploma_no_dir = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category } = req.body;
    const path = `/home/hori/webapps/otmd/backend/public/pdfs/diplome/${category}`;
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename: (req, file, cb) => {
    const { description } = req.body;

    cb(null, Date.now() + "-" + file.originalname);
  },
});

//=================================================================
const storage_diploma = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/hori/webapps/otmd/backend/public/pdfs/diplome");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const storage_article = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/hori/webapps/otmd/backend/public/pdfs/articole");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStorageDiploma = multer({ storage: storage_diploma });
const uploadStorageArtcile = multer({ storage: storage_article });
const uploadStorageDiploma_noDir = multer({ storage: storage_diploma_no_dir });

//Routes
//Get all pdfs
router.get("/", (req, res) => {
  res.json(pdfDB);
});

//Get single pdf
router.get("/:id", (req, res) => {
  const found = pdfDB.some((pdf) => pdf.id === parseInt(req.params.id));

  if (found) {
    res.json(pdfDB.filter((pdf) => pdf.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ message: `PDF with id ${req.params.id} not found` });
  }
});

// Single file diploma
router.post(
  "/upload/diploma/single/nodir",
  uploadStorageDiploma_noDir.single("file"),
  (req, res) => {
    console.log(req.file);
    return res.status(200).send("Single file");
  }
);

// Single file diploma
router.post(
  "/upload/diploma/single",
  uploadStorageDiploma.single("file"),
  (req, res) => {
    console.log(req.file);
    return res.status(200).send("Single file");
  }
);

// Single file article
router.post(
  "/upload/articol/single",
  uploadStorageArtcile.single("file"),
  (req, res) => {
    console.log(req.file);
    return res.send("Single file");
  }
);

// Single file diploma
router.get("/get/diploma/single", (req, res) => {
  console.log(__dirname);
  console.log("\n");
  res.download(
    "/home/hori/webapps/otmd/backend/public/pdfs/diplome/1625425512950-uitwvbexwibhavo.pdf"
  );
});
module.exports = router;
