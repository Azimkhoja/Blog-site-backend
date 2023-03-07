const jwt = require("../services/JwtGenerator");
const User = require("../models/users");

module.exports = async function (req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.send({ status: 401, message: "unauthorized" });
    }
    const token = auth.split(" ")[1];
    if (!token) {
      return res.send({ status: 401, message: "you are not logged in" });
    }
    const { id } = await jwt.verifyAccess(token);
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.send({ status: 403, message: "you have no access to do this action" });
    }
    req.body.user_id = id
    next();
  } catch (error) {
    console.log(error);
  }
};
