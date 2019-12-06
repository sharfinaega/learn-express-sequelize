require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../../src/db/models");
const { comments, post, user } = db;

module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(409).send({
        message: "body can't be empty"
      });
    }

    // cek user apakah sudah ada atau belum. cari user berdasarkan emailnya (key yg unik dari inputan user)
    const existedUser = await user.findOne({ where: { email } });
    if (existedUser) {
      return res.status(409).send({
        message: `user ${existedUser.name} already exist, please login`
      });
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (!err) {
            user
              .create({ name, email, password: hash })
              .then(result => {
                return res.status(201).send({
                  message: "user created",
                  result
                });
              })
              .catch(error => {
                return res.status(400).send({
                  message: "user not created",
                  error: error.message
                });
              });
          } else {
            return res.status(409).send({
              message: "hashing password is failed",
              error: error.message
            });
          }
        });
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const existedUser = await user.findOne({ where: { email } });
    if (existedUser) {
      const valid = bcrypt.compareSync(password, existedUser.password);
      if (valid) {
        jwt.sign(
          {
            user: {
              id: existedUser.id,
              email: existedUser.email,
              role: "admin"
            }
          },
          process.env.JWT_SECRET,
          { algorithm: "HS256", expiresIn: "1h" },
          function(err, token) {
            if (err) {
              return res.status(409).send({
                message: "token invalid",
                error: errpr.message
              });
            } else {
              return res.status(200).send({
                message: "proceed to explore !",
                token
              });
            }
          }
        );
      } else {
        return res.status(400).send("Password invalid");
      }
    } else {
      return res.status(400).send("User with that email doesn't exist");
    }
  },
  getUserById: async (req, res) => {
    const id = req.params.id;
    user.findOne({ where: { id } }).then(result => {
      if (result === null) {
        return res.send("User unknown");
      }
      return res.status(200).send({
        message: "get user by ID success",
        result
      });
    });
    // .catch(error => {
    //   res.status(400).send({
    //     message: "get user by ID error",
    //     error: error.message
    //   });
    // });
  },
  getAllUser: (req, res) => {
    user
      .findAll({
        include: [
          {
            model: post,
            as: "userPosts",
            include: [
              {
                model: comments,
                as: "postComments"
              }
            ]
          }
        ]
      })
      .then(result => {
        return res.status(200).send({
          message: "get all user success",
          result
        });
      })
      .catch(error => {
        res.status(400).send({
          message: "error to get all user",
          error: error.message
        });
      });
  },
  deleteUser: async (req, res) => {
    try {
      const usersId = req.params.id;
      const existedUser = user.destroy({ where: { id: usersId } });
      if (existedUser) {
        return res.status(200).send({
          message: "User deleted"
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "delete user error",
        error: error.message
      });
    }
  },
  updateUser: (req, res) => {
    try {
      const usersId = req.params.id;
      const { name, email, password } = req.body;
      const existedUser = user.update(
        {
          name,
          email,
          password
        },
        { where: { id: usersId } }
      );
      if (existedUser) {
        return res.status(200).send({
          message: "updated user success"
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "updated user error",
        error: error.message
      });
    }
  }
};
