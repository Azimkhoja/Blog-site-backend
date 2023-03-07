const router = require("express").Router();
const {
  createAdmin,
  getAdmin,
  loginAdmin,
  getAllAdmin,
  editAdmin,
} = require("../controller/admin.controller.js");
const superadminGuard = require("../middlewares/superadmin.guard");

router.post("/admin", superadminGuard, createAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin", superadminGuard, getAllAdmin);
router.get("/admin/:id", getAdmin);
router.put("/admin/:id", editAdmin);

module.exports = router;
