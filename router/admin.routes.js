const router = require("express").Router();
const {
  createAdmin,
  getAdmin,
  loginAdmin,
  getAllAdmin,
  editAdmin,
} = require("../controller/admin.controller.js");

router.post("/admin", createAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin", getAllAdmin);
router.get("/admin/:id", getAdmin);
router.put("/admin/:id", editAdmin);

module.exports = router;
  