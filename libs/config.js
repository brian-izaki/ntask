module.exports = (app) => {
  const env = process.env.NODE_ENV;
  if (Boolean(env)) {
    return require(`./config.${env}.js`);
  }
  return require("./config.development.js");
};


//   {
//   database: "ntasks",
//   username: "",
//   password: "",
//   dialect: "sqlite",
//   storage: "ntask.sqlite",
//   jwtSecret: "Nta$K-AP1",
//   jwtSession: {session: false}
// };
