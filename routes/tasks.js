const Tasks = require("../models/Tasks");

module.exports = (app) => {
  app
    .route("/tasks")
    .all((req, res, next) => {
      // middleware que executa antes de qualquer execução de rota
      delete req.body.id; // para evitar sobreescrever qnd inserir ou alterar
      next(); // para avisar que pode executar outra rota.
    })
    .get((req, res) => {
      // listagem de recursos
      Tasks.findAll({})
        .then((result) => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      // para inserção
      Tasks.create(req.body)
        .then((result) => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    });

  app
    .route("/tasks/:id")
    .all((req, res, next) => {
      delete req.body.id;
      next();
    })
    .get((req, res) => {
      Tasks.findOne({ where: req.params })
        .then((result) => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch((error) => {
          res.status(412);
        });
    })
    .put((req, res) => {
      Tasks.update(req.body, { where: req.params })
        .then((result) => res.sendStatus(204))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    })
    .delete((req, res) => {
      Tasks.destroy({ where: req.params })
        .then((result) => res.sendStatus(204))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    });
};
