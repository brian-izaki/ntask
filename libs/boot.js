const https = require("https"),
  fs = require("fs");

module.exports = (app) => {
  if (process.env.NODE_ENV !== "test") {
    const credentials = {
      key: fs.readFileSync("server.key", "utf-8"),
      cert: fs.readFileSync("server.cert", "utf-8"),
    };
    https.createServer(credentials, app).listen(app.get("port"), () => {
      console.log(`iniciado ${app.get("port")}`);
    });
  }
};
