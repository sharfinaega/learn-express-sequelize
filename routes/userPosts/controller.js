const db = require("../../src/db/models");
const { user, post, postImage } = db;

module.exports = {
  getUserPost: (req, res) => {
    user
      .findAll({
        attributes: ["id", "name", "email"], //biar id, nama, email gak muncul, pakai attribute
        include: [
          {
            model: post,
            as: "userPosts" //nama awalnya post, kalo mau diganti jadi userPosts tambahin as di controller dan di user.js juga
          }
        ]
      })
      .then(result => {
        res.status(200).send({
          message: "all users with post",
          result
        });
      })
      .catch(error => {
        res.status(500).send({
          message: "failed to get all users with post",
          error: error.message
        });
      });
  },

  addPost: (req, res) => {
    const { imagePost, ...postBody } = req.body;
    console.log(req.file);
    //post yang buat image
    post
      .create(postBody)
      .then(result => {
        postImage.create({
          name: req.file.originalname,
          path: req.file.path,
          postId: result.id
        });
        return result;
      })
      .then(result => {
        res.status(201).send({
          message: "post created",
          result
        });

        //post yang buat text
        // post
        //   .create(req.body)
        //   .then(result => {
        //     res.status(201).send({
        //       message: "post created",
        //       result
        //     });
        //   })
        //   .catch(error => {
        //     res.status(500).send({
        //       message: "failed to post",
        //       error: error.message
      })
      .catch(error => {
        res.status(500).send({
          message: "failed to post",
          error: error.message
        });
      });
  }
};
