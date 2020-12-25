module.exports = (app) => {
  app.listen(app.get("port"), () => {
    console.log(`iniciado ${app.get("port")}`);
  });
};
