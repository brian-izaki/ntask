const logger = require("../libs/logger");

module.exports = {
  database: "ntasks",
  username: "",
  password: "",
  dialect: "sqlite",
  storage: "ntask.sqlite",
  logging: (sql) => {
    logger.info(`[${new Date()}] ${sql}`)
  },
  jwtSecret: "Nta$K-AP1",
  jwtSession: {session: false}
};
