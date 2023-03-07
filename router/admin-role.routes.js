const router = require("express").Router();
const {
  createAdminRole,
  getAdminRole,
  getAllAdminRole,
  editAdminRole,
} = require("../controller/admin-role.controller.js");
const for_all_adminGuard = require("../middlewares/admins.guard");

router.post("/admin-role", for_all_adminGuard, createAdminRole);
router.get("/admin-role", for_all_adminGuard, getAllAdminRole);
router.get("/admin-role/:id", for_all_adminGuard, getAdminRole);
router.put("/admin-role/:id", for_all_adminGuard, editAdminRole);

module.exports = router;
