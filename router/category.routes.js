const router = require("express").Router();
const {
  createCategory,
  getAllCategory,
  getCategory,
  editCategory,
} = require("../controller/category.controller");
const superadminGuard = require("../middlewares/superadmin.guard")


router.post("/category", superadminGuard, createCategory);
router.get("/category", getAllCategory);
router.get("/category/:id", getCategory);
router.put("/category/:id", editCategory);

module.exports = router;
