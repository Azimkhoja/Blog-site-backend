const router = require("express").Router();
const {
  createAdmin,
  getAdmin,
  getAllAdmin,
  editAdmin,
} = require("../controller/admin.controller.js");

router.post("/admin", createAdmin);
router.get("/admin", getAllAdmin);
router.get("/admin/:id", getAdmin);
router.put("/admin/:id", editAdmin);

module.exports = router;
  