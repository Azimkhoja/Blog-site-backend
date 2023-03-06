const router = require("express").Router();
const {
  createAdminRole,
  getAdminRole,
  getAllAdminRole,
  editAdminRole,
} = require("../controller/admin-role.controller.js");

router.post("/admin-role", createAdminRole);
router.get("/admin-role", getAllAdminRole);
router.get("/admin-role/:id", getAdminRole);
router.put("/admin-role/:id", editAdminRole);

module.exports = router;
