const db = require("../../src/db/models");
const { comments, post, user } = db;

module.exports = {
  addCommentToPostByUser: (req, res) => {
    comments
      .create(req.body)
      .then(result => {
        res.status(201).send({
          message: "comments created",
          result
        });
      })
      .catch(error => {
        res.status(500).send({
          message: "failed to create comment",
          error: error.message
        });
      });
  },
  getComment: (req, res) => {
    comments
      .findAll({
        attributes: ["name", "content"],
        include: [
          {
            model: post
          },
          {
            model: user
          }
        ]
      })
      .then(result => {
        res.send({
          message: "get all comment",
          result
        });
      })
      .catch(error => {
        res.send({
          message: "error get comments",
          error: error.message
        });
      });
  }
};
