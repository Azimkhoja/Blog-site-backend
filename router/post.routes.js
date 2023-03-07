const router = require("express").Router();
const {
  createPost,
  getAllPost,
  getPost,
  editPost,
} = require("../controller/post.controller");

router.post("/post/add", createPost);
router.get("/post", getAllPost);
router.get("/post/:id", getPost);
router.put("/post/:id", editPost);

module.exports = router;
