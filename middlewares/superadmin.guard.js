const jwt = require("../services/JwtGenerator");
const Admin = require("../models/Admin.model");

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
    const {role, id} = await jwt.verifyAccess(token);
    const admin = await Admin.findOne({ where: { id: id } });
    if (!admin) {
      return res.send({ status: 403, message: "you have no access to do this action" });
    }
    req.body.admin_id = id
    if(role != 1) {
      return res.send({ status: 403, message: "you do not have permission to do this action" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
