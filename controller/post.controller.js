const Post = require("../models/Posts.model");
const uuid = require('uuid4')

const createPost = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.send({status:400, message: 'No files were uploaded.'});
    }
    
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.img.name ;
    let img_name = uuid() + sampleFile.slice(sampleFile.lastIndexOf('.'))
    let uploadPath = process.cwd() + `/images/${img_name}`;

    // Use the mv() method to place the file somewhere on your server
     req.files.img.mv(uploadPath, function(err) {
      if (err)
      return res.send({status:500, message: err})
      
    });

    if(Object.keys(uploadPath).length === 0){
      return res.send({status:400, message:"No data entered "})
    }
    
    req.body.img_link = img_name
    const post = await Post.create(req.body)
    
    res.send({status: 201, message: "post successfully created" , post})
  } catch (error) {
    console.log(error.message);
  }
};

const getPost = async (req, res) => {
  try {
    let post = await Post.findOne({where: {id: req.params.id}})
    if(!post){
    return res.send({status: 404, message: "Post not found"})
    }
    res.send({status: 200, post})
  } catch (error) {
    console.log(error);
  }
};

const getAllPost = async (req, res) => {
  try {
    let allPost = await Post.findAll()
    if(allPost.length === 0){
      return res.send({status: 404, message:"posts not found" })
    }
    res.send({status: 200, allPost})
  } catch (error) {
    console.log(error);
  }
};
const editPost = async (req, res) => {
  try {
    if(Object.keys(req.body).length === 0){
      return res.send({status: 400, message:"no data to edit"})
    }
    let editPost = await Post.update(req.body, {where: {id: req.params.id}})
    if(!editPost){
      return res.send({status: 404, message: "post not found by this id"})
    }
    res.send({status:200, message: "Post edited successfully"})
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    createPost,
    getAllPost,
    getPost,
    editPost
}