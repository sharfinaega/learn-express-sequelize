require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  authorization: (req, res, next) => {
    try {
      console.log(req.headers);
      //   get token from request
      if (!req.headers.authorization) {
        return res.send("please add token!");
      }
      const token = req.headers.authorization.split(" ")[1];
      console.log(token.user);

      // verify token
      const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET);

      // token validation process
      if (tokenIsValid.user.role === "admin") {
        return next();
      } else {
        return res.send("you are not valid to see this route because you are not ADMIN");
      }
    } catch (error) {
      res.status(400).send({
        message: "error in auth helpers, provide token to access this API",
        error: error.message
      });
    }
  }
};
