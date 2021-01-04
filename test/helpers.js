// Configuração para agilizar os testes
const app = require("../index"),
  request = require("supertest")(app),
  chai = require("chai");

  module.exports = {
  app,
  request, 
  expect: chai.expect
}
