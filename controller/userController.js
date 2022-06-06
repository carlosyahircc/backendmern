const User = require("../models/User");
const bcript = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const palabra = "secretopapu";

exports.createUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.send({ errores: error.array() });
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send({ msg: "El usuario ya existe" });

    user = new User(req.body);
    user.password = await bcript.hash(password, 10);
    await user.save();

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
    res.sendStatus(400).send("Hubo un error");
  }
};
