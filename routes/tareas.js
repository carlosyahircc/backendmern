const express = require("express");
const {
  createTarea,
  getTarea,
  updateTarea,
  deleteTarea,
} = require("../controller/tareaController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router();

router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().notEmpty(),
    check("proyecto", "El proyecto es obligatorio").not().isEmpty(),
  ],
  createTarea
);

router.get("/", auth, getTarea);

router.put(
  "/:id",
  auth,
  // [check("nombre", "El nombre es obligatorio").not().notEmpty()],
  updateTarea
);

router.delete("/:id", auth, deleteTarea);
module.exports = router;
