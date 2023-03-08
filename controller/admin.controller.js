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
      role: admin.role_id,
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
    let { username,password } = req.body;
    let admin = await Admin.findOne({ where: { username: username } });
    console.log(!admin);
    if (!admin) {
      return res.send({ status: 405, message: "you are not registered" });
    }
    const validPassword = bcrypt.compareSync(
      password,
      admin.hash_password
    );
    if (!validPassword) {
      return res.send({ status: 400, message: "wrong username or password" });
    }
    await Admin.update({ status: true }, { where: { id: admin.id } });
    const payload = {
      role: admin.role_id,
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
      role: admin.role_id,
      username : admin.username
    });
  } catch (error) {
    console.log(error);
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { id: req.params.id } });

    console.log(admin);
    if (!admin) {
      return res.send({ status: 404, message: "not found" });
    }
    res.send({ status: 200, admin });
  } catch (error) {
    console.log(error);
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    if (admins.length == 0) {
      return res.send({ status: 404, message: "No admin found" });
    }
    res.send({ status: 200, admins });
  } catch (error) {
    console.log(error);
  }
};

const editAdmin = async (req, res) => {
  try {
    console.log(Object.values(req.body).length  );
    if(Object.keys(req.body).length == 0){
      return res.send({ status: 400, message: "data not entered" });
    }
    let updateAdmin = await Admin.update(req.body, {
      where: { id: req.params.id },
    });
    res.send({  
      status: 200,
      data: updateAdmin,
      message: "Seccessfully updated",
    });
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
