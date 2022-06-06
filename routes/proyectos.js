const express = require("express");
const {
  createProyecto,
  getProyectos,
  updateProyecto,
  deleteProyect,
} = require("../controller/proyectoController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router();

router.post(
  "/",
  auth,
  [check("nombre", "El nombre es obligatorio").not().notEmpty()],
  createProyecto
);

router.get("/", auth, getProyectos);

router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre es obligatorio").not().notEmpty()],
  updateProyecto
);

router.delete("/:id", auth, deleteProyect);
module.exports = router;
