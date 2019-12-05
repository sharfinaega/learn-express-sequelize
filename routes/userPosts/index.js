const express = require("express");
const router = express.Router();

const { getUserPost, addPost } = require("./controller");

router.get("/", getUserPost);
router.post("/", addPost);

module.exports = router;
