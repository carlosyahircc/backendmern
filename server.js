"use strict";
const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
conectarDB();

app.use(express.json());
app.use(cors());
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));
app.get("/", (req, res) => {
  res.send("omla");
});

app.listen(port, () => {
  console.log("iniciamos");
});
