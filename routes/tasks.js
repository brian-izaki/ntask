const Tasks = require("../models/Tasks");

/**
 * o req.user é por causa do arquivo auth sendo chamado no .all, 
 * assim é gerado um atributo user no req que é referente ao usuário logado
 * no momento 
 */

module.exports = (app) => {
  app
    .route("/tasks")
    .all(app.auth.authenticate())
    .get((req, res) => {
      // listagem de recursos
      Tasks.findAll({
        where: { user_id: req.user.id },
      })
        .then((result) => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      // para inserção do relacionamento com o user logado.
      req.body.user_id = req.user.id;
      Tasks.create(req.body)
        .then((result) => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    });

  app
    .route("/tasks/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      Tasks.findOne({
        where: { id: req.params.id, user_id: req.user.id },
      })
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
      Tasks.update(req.body, {
        where: { id: req.params.id, user_id: req.user.id },
      })
        .then((result) => res.sendStatus(204))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    })
    .delete((req, res) => {
      Tasks.destroy({ 
        where: {id: req.params.id, user_id: req.user.id }
      })
        .then((result) => res.sendStatus(204))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    });
};
