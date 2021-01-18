const Users = require("../models/Users");
const Taska = require("../models/Tasks");
const Tasks = require("../models/Tasks");

module.exports = (app) => {
  app
    .route("/user")
    .all(app.auth.authenticate())
    /**
     * @api {get} /user Exibe usuário autenticado
     * @apiGroup Usuário
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "Bearer xyz.abc.123"}
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} name Nome
     * @apiSuccess {String} email Email
     * @apiSuccess {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "john",
     *      "email": "john@email.com"
     *    }
     * @apiErrorExample {json} Erro de consulta
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Users.findByPk(req.user.id, {
        attributes: ["id", "name", "email"],
      })
        .then((result) => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    })
    /**
     * @api {delete} /user Exclui usuário autenticado
     * @apiGroup Usuário
     * @apiHeader {String} Authorization Token de usuário
     * @apiHeaderExample {json} Header
     *    {"Authorization": "Bearer xyz.abc.123"}
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Erro na exclusão
     *    HTTP/1.1 412 Precondition Failed
     *
     */
    .delete((req, res) => {
      Tasks.destroy({ where: { user_id: req.user.id } }).then((result) => {
        Users.destroy({ where: { id: req.user.id } })
          .then((result) => res.sendStatus(204))
          .catch((error) => {
            res.status(412).json({ msg: error.message });
          });
      });
    });

  /**
   * @api {post} /users Cadastra novo usuário
   * @apiGroup Usuário
   * @apiParam {String} name Nome
   * @apiParam {String} email Email
   * @apiParam {String} password Senha
   * @apiParamExample {json} Entrada
   *    {
   *      "name": "John",
   *      "email": "john@email.com",
   *      "password": "12345"
   *    }
   * @apiSuccess {Number} id Id de registro
   * @apiSuccess {String} name Nome
   * @apiSuccess {String} email Email
   * @apiSuccess {String} password Senha
   * @apiSuccess {Date} updated_at Data de atualização
   * @apiSuccess {Date} created_at Data de criação
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {
   *      "id": 1,
   *      "name": "John",
   *      "email": "john@email.com",
   *      "password": "12345",
   *      "updated_at": "2021-01-11T15:50:555Z"
   *      "created_at": "2021-01-11T15:50:555Z"
   *    }
   * @apiErrorExample {json} Erro no cadastro
   *    HTTP/1.1 412 Precondition Failed
   */
  app.post("/users", (req, res) => {
    Users.create(req.body)
      .then((result) => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  });
};
