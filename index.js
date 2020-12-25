const express = require('express');
const consign = require('consign');

const app = express();
app.use(express.json())

// carrega e injeta dependências de forma simples
consign()
  .include('libs/config.js')
  .then('models/index.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app)


