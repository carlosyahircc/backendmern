const jwt = require("jsonwebtoken");
const palabra = "secretopapu";
module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.sendStatus(401);

  try {
    const cifrado = jwt.verify(token, palabra);

    req.usuario = cifrado.usuario;

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};
