const jwt = require("jwt-simple");
const cfg = require("../libs/config")();
const Users = require("../models/Users");

module.exports = (app) => {
  // lógica de autenticação do usuário
  /**
   * @api {post} /token Token autenticado
   * @apiGroup Credencial
   * @apiParam {String} email Email de usuário
   * @apiParam {String} password Senha de usuário
   * @apiParamExample {json} Entrada
   *    {
   *      "email": "john@email.com",
   *      "password": "1234"
   *    } 
   * @apiSuccess {String} token Token de usuário autenticado
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {"token": "xyz.abc.123"}
   * @apiErrorExample {json} Erro de autenticação
   *    HTTP/1.1 401 Unauthorized
   */
  app.post("/token", (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      Users.findOne({ where: { email } })
        .then((user) => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.json({
              token: jwt.encode(payload, cfg.jwtSecret),
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch((error) => {
          res.sendStatus(401);
        });
    } else {
      res.sendStatus(401);
    }
  });
};
