const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Users = require("./models/Users");
const cfg = require("./libs/config")();

module.exports = (app) => {
  let opts = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  // constrói a estratégia que utiliza o Passport + JWT
  const strategy = new Strategy(opts, (payload, done) => {
    Users.findByPk(payload.id)
      .then((user) => {
        if (user) {
          // para que apenas tenha id e email no token
          return done(null, {
            id: user.id,
            email: user.email,
          });
        }

        return done(null, false);
      })
      .catch((error) => done(error, null));
  });

  // lógica do middleware é injetada
  passport.use(strategy);

  // será retornado duas funções
  return {
    initialize: () => {
      // inicializa o passport
      return passport.initialize();
    },
    authenticate: () => {
      //autentica o acesso de uma rota
      return passport.authenticate("jwt", cfg.jwtSession);
    },
  };
};
