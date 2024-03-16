const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
      return res.send("You are not authenticated!!");
   }

  jwt.verify(token, "ss", (err, user));
};
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id);
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.send("You are not authorized User!!");
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next(), () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.send("You are not authorized Admin!!");
    }
  });
};
module.exports.verifyToken = verifyToken;
module.exports.verifyUser = verifyUser;
module.exports.verifyAdmin = verifyAdmin;
