const router = require("express").Router();
const adminRouter = require("./admin.routes");
const postsRouter = require("./post.routes");
const adminRoleRouter = require("./admin-role.routes");
const categoryRouter = require("./category.routes");

router.use("/api", adminRouter);
router.use("/api", postsRouter);
router.use("/api", adminRoleRouter);
router.use("/api", categoryRouter);

module.exports = router;
