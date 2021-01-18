const express = require("express"),
  cors = require("cors"),
  morgan = require("morgan"),
  logger = require("./logger"),
  compression = require("compression"),
  helmet = require("helmet");

module.exports = (app) => {
  // formata a visualização do JSON no response
  app.set("json spaces", 4);
  app.set("port", 3000);

  app.use(
    morgan("common", {
      stream: {
        write: (message) => {
          logger.info(message);
        },
      },
    })
  );
  // comentado pois ocorria erros de CSP ao carregar docementação da apidoc
  // app.use(helmet());
  
  app.use(
    cors({
      origin: "*", // aceita apenas apps clientes desse domínio
      methods: ["GET", "POST", "PUT", "DELETE"], // metodos permitidos
      allowedHeaders: ["Content-Type", "Authorization"], // cabeçalhos permitidos
    })
  );
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  // compacta as requisições para o formato GZIP
  app.use(compression());
  // possibilita o recebimento de JSON
  app.use(express.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    // middleware que executa antes de qualquer execução de rota
    delete req.body.id; // para evitar sobreescrever qnd inserir ou alterar
    next(); // para avisar que pode executar outra rota.
  });

  // habilita arquivos estáticos
  app.use(express.static("public"));
};
