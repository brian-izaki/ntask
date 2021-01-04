
const express = require("express");
const consign = require("consign");

const app = express();

// carrega e injeta dependências de forma simples,
// a ordem da dependencia importa
consign({ verbose: false })
  .include("libs/config.js")
  .then("auth.js")
  .then("libs/middlewares.js")
  .then("routes")
  .then("libs/boot.js")
  .into(app);

module.exports = app;
