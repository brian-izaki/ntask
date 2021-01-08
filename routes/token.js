const jwt = require("jwt-simple");
const cfg = require("../libs/config")();
const Users = require("../models/Users");

module.exports = (app) => {
  // lógica de autenticação do usuário
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
