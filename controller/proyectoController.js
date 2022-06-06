const Proyecto = require("../models/Proyecto");
const bcript = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const palabra = "secretopapu";

exports.createProyecto = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.send({ errores: error.array() });

  try {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario.id;
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
  }
};

exports.getProyectos = async (req, res) => {
  try {
    const proyecto = await Proyecto.find({ creador: req.usuario.id }).sort({
      creadp: -1,
    });

    res.send({ proyecto });
  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
};

exports.updateProyecto = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.send({ errores: error.array() });

  const { nombre } = req.body;

  if (!nombre) return res.send({ msg: "falta un campo" });
  try {
    let proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) return res.sendStatus(404);
    if (proyecto.creador.toString() !== req.usuario.id)
      return res.sendStatus(401);

    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { nombre: nombre },
      { new: true }
    );
    res.send({ msg: "success" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.deleteProyect = async (req, res) => {
  try {
    let proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) return res.sendStatus(404);
    if (proyecto.creador.toString() !== req.usuario.id)
      return res.sendStatus(401);

    await Proyecto.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Eliminado u.u" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
