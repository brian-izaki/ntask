const fs = require("fs"),
  winston = require("winston");

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

// Logger que é explicado no livro foi alterado para createLogger
module.exports = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "logs/app.log",
      maxsize: 1048576,
      maxFiles: 10,
    }),
  ],
});