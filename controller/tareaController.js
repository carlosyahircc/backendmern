const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const bcript = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const palabra = "secretopapu";

exports.createTarea = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.send({ errores: error.array() });

  try {
    const { proyecto: proyectoID } = req.body;
    const proyecto = await Proyecto.findById(proyectoID);
    if (!proyecto) return res.send({ msg: "Proyecto not Found" });

    if (proyecto.creador.toString() !== req.usuario.id)
      return res.sendStatus(401);

    const tarea = new Tarea(req.body);

    tarea.save();
    res.json(tarea);
  } catch (error) {
    console.log(error);
  }
};

exports.getTarea = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.send({ errores: error.array() });

  try {
    const { proyecto: proyectoID } = req.query;
    console.log(proyectoID);
    const proyecto = await Proyecto.findById(proyectoID);
    if (!proyecto) return res.send({ msg: "Proyecto not Found" });

    if (proyecto.creador.toString() !== req.usuario.id)
      return res.sendStatus(401);

    const tareas = await Tarea.find({ proyecto: proyectoID });
    res.send({ tareas });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTarea = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.send({ errores: error.array() });

  try {
    const { proyecto: proyectoID, nombre, estado } = req.body;
    const proyecto = await Tarea.findById(req.params.id);
    if (!proyecto) return res.send({ msg: "Tarea not Found" });
    const proyecto1 = await Proyecto.findById(proyectoID);
    if (!proyecto1) return res.send({ msg: "Proyecto not Found" });
    if (proyecto1.creador.toString() !== req.usuario.id)
      return res.sendStatus(401);

    let newTarea = {};

    newTarea.nombre = nombre;
    newTarea.estado = estado;

    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id },
      newTarea,
      { new: true }
    );
    res.send({ tarea });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};

exports.deleteTarea = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.send({ errores: error.array() });

  try {
    const { proyecto: proyectoID } = req.query;
    const proyecto = await Tarea.findById(req.params.id);
    if (!proyecto) return res.send({ msg: "Tarea not Found" });
    const proyecto1 = await Proyecto.findById(proyectoID);
    if (!proyecto1) return res.send({ msg: "Proyecto not Found" });
    if (proyecto1.creador.toString() !== req.usuario.id)
      return res.sendStatus(401);

    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.send({ msg: "success" });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};
