const AdminRole = require("../models/Admin-role.model");

const createAdminRole = async (req, res) => {
  try {
    const role = await AdminRole.create(req.body)
    res.send({status: 201, message: "Role created successfully"})
  } catch (error) {
    console.log(error);
  }
};

const getAdminRole = async (req, res) => {
  try {
    const roles = await AdminRole.findOne({where: {id: req.params.id}})
    if(!roles){
      return res.send({status: 404, message:"No admin role found"})
    }
    res.send({status: 200, message: "Admin role found", roles})
  } catch (error) {
    console.log(error);
  }
};

const getAllAdminRole = async (req, res) => {
  try {
    const adminRole = await AdminRole.findAll()
    if(adminRole.length === 0) {
      return res.send({status: 404, message:"Roles not found"})
    }
    res.send({status: 200, adminRole})
  } catch (error) {
    console.log(error);
  }
};
const editAdminRole = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    createAdminRole,
    getAllAdminRole,
    getAdminRole,
    editAdminRole
}