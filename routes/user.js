const express = require("express");
const { createUser } = require("../controller/userController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router();

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),

    check("email", "Ingresa un Email valido").isEmail(),
    check("password", "El password debe ser minimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  createUser
);

module.exports = router;
