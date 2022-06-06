const express = require("express");
const { authUser, userAuth } = require("../controller/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router();

router.post(
  "/",
  [
    check("email", "Ingresa un Email valido").isEmail(),
    check("password", "El password debe ser minimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  authUser
);
router.get("/", auth, userAuth);
module.exports = router;
