const Category = require("../models/Category.model");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.send({status: 201, message: "category created successfully"})
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({where: {id: req.params.id}})
    if(!category){
      return res.send({status: 404, message: "category not found"})
    }
    res.send({status: 200, category})
  } catch (error) {
    console.log(error);
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    if(category.length == 0) {
      return res.send({status: 404, message: "category not found"})
    }
    res.send({status: 200, category })
  } catch (error) {
    console.log(error);
  }
};
const editCategory = async (req, res) => {
  try {
    if(Object.keys(category).length == 0) {
      return res.send({status: 400, message: "category not entered"})
    }
    let category = Category.update(req.body, {where: {id: req.params.id}})
    if(category.length == 0) {
      return res.send({status: 400, message: "category not found to update"})
    }
    res.send({status: 200, category, message: "category updated"})
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    createCategory,
    getAllCategory,
    getCategory,
    editCategory
}