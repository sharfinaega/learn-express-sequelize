const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images/posts");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const { getUserPost, addPost } = require("./controller");

router.get("/", getUserPost);
router.post("/", upload.single("imagePost"), addPost);

module.exports = router;
