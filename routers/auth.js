const router = require("express").Router();
const passport = require("passport");
const controller = require("../controller/Controller");

router.post("/signup", controller.signup);

router.post("/signin", controller.signin);

router.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  controller.check
);

module.exports = router;
