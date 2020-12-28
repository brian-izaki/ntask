const express = require("express");

module.exports = (app) => {
  // formata a visualização do JSON no response
  app.set("json spaces", 4);
  app.set("port", 3000);

  // possibilita o recebimento de JSON
  app.use(express.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    // middleware que executa antes de qualquer execução de rota
    delete req.body.id; // para evitar sobreescrever qnd inserir ou alterar
    next(); // para avisar que pode executar outra rota.
  });
};
