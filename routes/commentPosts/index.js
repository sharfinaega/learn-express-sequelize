const express = require("express");
const router = express.Router();

const { addCommentToPostByUser, getComment } = require("./controller");

router.post("/", addCommentToPostByUser);
router.get("/", getComment);

module.exports = router;
