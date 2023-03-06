const Admin = require("../models/Admin.model");
const bcrypt = require("bcrypt");
const jwt = require("../services/JwtGenerator");
const config = require("config");

const createAdmin = async (req, res) => {
  try {
    let { fullname, hash_password, username, role_id } = req.body;
    let admin = await Admin.findOne({ where: { username: username } });

    if (admin) {
      return res.send({ message: "this admin already exists" });
    }
    let hashedPassword = bcrypt.hashSync(hash_password, 7);
    admin = await Admin.create({
      fullname,
      username,
      hash_password: hashedPassword,
      is_active: true,
      role_id,
    });
    const payload = {
      username: admin.username,
      id: admin.id,
    };
    const access_token = jwt.generateTokens(payload);
    await admin.save();
    res.cookie("access_token", access_token, {
      maxAge: config.get("cookie_time"),
      httpOnly: true,
    });
    return res.send({
      status: 201,
      message: "admin successfully created",
      access_token,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    let { username, hash_password } = req.body;
    let admin = await Admin.findOne({ where: { username: username } });
    if (!admin) {
      return res.send({ status: 404, message: "you are not registered" });
    }
    const validPassword = bcrypt.compareSync(
      hash_password,
      admin.hash_password
    );
    if (!validPassword) {
      return res.send({ status: 400, message: "wrong username or password" });
    }
    await Admin.update({ status: true }, { where: { id: admin.id } });
    const payload = {
      username: admin.username,
      id: admin.id,
    };
    const access_token = jwt.generateTokens(payload);
    res.cookie("access_token", access_token, {
      maxAge: config.get("cookie_time"),
      httpOnly: true,
    });
    return res.send({
      status: 200,
      message: "Successful login",
      access_token,
      role_id: admin.role_id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getAdmin = async (req, res) => {
  try {
    console.log("Admin created");
  } catch (error) {
    console.log(error);
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    if(admins.length == 0) {
      return res.send({status: 404, message:"No admin found"})
    }
    res.send({status: 200, admins})
  } catch (error) {
    console.log(error);
  }
};

const editAdmin = async (req, res) => {
  try {
    let updateAdmin = await Admin.update(req.body, {where: {id: req.params.id}})
    res.send({status: 200, data: updateAdmin, message: "Seccessfully updated"})
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  createAdmin,
  getAllAdmin,
  getAdmin,
  loginAdmin,
  editAdmin,
};
