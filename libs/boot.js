module.exports = (app) => {
  app.db
    .sync({ alter: true })
    .then(() => {
      app.listen(app.get("port"), () => {
        console.log(`iniciado ${app.get("port")}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
