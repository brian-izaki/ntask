// Configuração para agilizar os testes
const app = require("../index"),
  request = require("supertest")(app),
  chai = require("chai");

module.exports = {
  request,
  expect: chai.expect,
};
