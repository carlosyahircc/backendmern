const User = require("../models/User");
const bcript = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const palabra = "secretopapu";

exports.authUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(401).send({ errores: error.array() });
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(404).send({ msg: "EL usuario no existe" });

    const checkPassword = await bcript.compare(password, user.password);

    if (!checkPassword)
      return res.status(401).send({ msg: "Contrase;a o email incorrectos" });

    const payload = { usuario: { id: user.id } };
    jwt.sign(
      payload,
      palabra,
      {
        expiresIn: 36000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.userAuth = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select("-password");
    console.log(usuario);
    if (!usuario) return res.status(404).send({ msg: "Not found" });

    res.json({ usuario });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
