const router = require("express").Router();
const {
  createCategory,
  getAllCategory,
  getCategory,
  editCategory,
} = require("../controller/category.controller");

router.post("/category", createCategory);
router.get("/category", getAllCategory);
router.get("/category/:id", getCategory);
router.put("/category/:id", editCategory);

module.exports = router;
