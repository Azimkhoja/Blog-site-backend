const router = require("express").Router();
const {
  createPost,
  getAllPost,
  getPost,
  editPost,
} = require("../controller/post.controller");
const for_all_adminGuard = require('../middlewares/admins.guard')

router.post("/post/add",for_all_adminGuard, createPost);
router.get("/post", getAllPost);
router.get("/post/:id", getPost);
router.put("/post/:id", editPost);

module.exports = router;
