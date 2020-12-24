import express from 'express';
import consign from 'consign';

const app = express();

// carrega e injeta dependências de forma simples
consign()
  .include('db.js')
  .then('models')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app)


