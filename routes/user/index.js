var express = require("express");
var router = express.Router();

const { register, login, getAllUser, getUserById, deleteUser, updateUser } = require("./controller");
const { authorization } = require("../../helpers/auth");

const db = require("../../src/db/models");
/* GET users listing. */
// router.get("/", authorization, function(req, res, next) {
//   res.send("apa kabar dunia");
// });

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/authentication", register);
router.post("/login", login);
router.delete("/:id", authorization, deleteUser); //login dulu dengan data yg sudah diregister untuk dpt token, lalu masukin ke head di postman dgn format "Bearer kode tokennya"
router.put("/:id", authorization, updateUser);

module.exports = router;
