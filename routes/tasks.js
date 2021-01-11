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
    /**
     * @api {get} /tasks Exibe todas as tarefas registradas
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "Bearer xyz.abc.123"}
     * @apiSuccess {Object[]} tasks Lista de tarefas
     * @apiSuccess {Number} id Id da tarefa
     * @apiSuccess {Number} user_id Id do usuário que cadastrou a tarefa
     * @apiSuccess {String} tittle Título da tarefa
     * @apiSuccess {Boolean} done Tarefa foi concluída?
     * @apiSuccess {Boolean} done Situação se a tarefa foi ou não concluída
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de criação
     *
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    [{
     *      "id": 1,
     *      "user_id": 1,
     *      "tittle": "tarefa 50",
     *      "done": false,
     *      "createdAt": "2021-01-11T18:04:03.503Z",
     *      "updatedAt": "2021-01-11T18:04:03.503Z"
     *    }]
     * @apiErrorExample {json} Erro
     *    HTTP/1.1 412 Precondition Failed
     */
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
    /**
     * @api {post} /tasks Cadastra nova tarefa
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token de usuário válido
     * @apiHeaderExample {json} Header
     *    {"Authorization": "Bearer xyz.abc.123"}
     * @apiParam {String} tittle Título da tarefa
     * @apiParam {Boolean} done Tarefa foi concluída?
     * @apiParamExample {json} Entrada
     *    {
     *      "tittle": "tarefa 01",
     *      "done": false
     *    }
     *
     * @apiSuccess {Number} id Id da tarefa
     * @apiSuccess {Number} user_id Id do usuário que cadastrou a tarefa
     * @apiSuccess {String} tittle Título da tarefa
     * @apiSuccess {Boolean} done A Tarefa foi concluída?
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de criação
     *
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "tittle": "tarefa 01",
     *      "done": false,
     *      "user_id": 1,
     *      "updatedAt": "2021-01-11T18:04:22.303Z",
     *      "createdAt": "2021-01-11T18:04:22.303Z"
     *    }
     * @apiErrorExample {json} Esso no cadastro
     *    HTTP/1.1 412 Precondition Failed
     */
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
    /**
     * @api {get} /tasks/:id Exibe uma tarefa
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "Bearer xyz.abc.123"}
     * @apiParam {id} id Id da tarefa
     * @apiSuccess {Number} id Id da tarefa
     * @apiSuccess {Number} user_id Id do usuário que cadastrou a tarefa
     * @apiSuccess {String} tittle Título da tarefa
     * @apiSuccess {Boolean} done Tarefa foi concluída?
     * @apiSuccess {Boolean} done Situação se a tarefa foi ou não concluída
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de criação
     *
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "user_id": 1,
     *      "tittle": "tarefa 50",
     *      "done": false,
     *      "createdAt": "2021-01-11T18:04:03.503Z",
     *      "updatedAt": "2021-01-11T18:04:03.503Z"
     *    }
     * @apiErrorExample {json} Tarefa não encontrada
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
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
    /**
     * @api {put} /tasks/:id Atualiza uma tarefa
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token de usuário válido
     * @apiHeaderExample {json} Header
     *    {"Authorization": "Bearer xyz.abc.123"}
     * @apiParam {id} id Id da tarefa
     * @apiParam {String} tittle Título da tarefa
     * @apiParam {Boolean} done Tarefa foi concluída?
     * @apiParamExample {json} Entrada
     *    {
     *      "tittle": "tarefa alterada",
     *      "done": true
     *    }
     *
     * @apiSuccess {Number} id Id da tarefa
     * @apiSuccess {Number} user_id Id do usuário que cadastrou a tarefa
     * @apiSuccess {String} tittle Título da tarefa
     * @apiSuccess {Boolean} done A Tarefa foi concluída?
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de criação
     *
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Esso no cadastro
     *    HTTP/1.1 412 Precondition Failed
     */
    .put((req, res) => {
      Tasks.update(req.body, {
        where: { id: req.params.id, user_id: req.user.id },
      })
        .then((result) => res.sendStatus(204))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    })
    /**
     * @api {delete} /tasks/:id Exclui uma tarefa
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "Bearer xyz.abc.123"}
     * @apiParam {id} id Id da tarefa
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 204 No content
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */ 
    .delete((req, res) => {
      Tasks.destroy({
        where: { id: req.params.id, user_id: req.user.id },
      })
        .then((result) => res.sendStatus(204))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    });
};
