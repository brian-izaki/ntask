module.exports = (app) => {
  app.db.sync().done(() => {
    app.listen(app.get("port"), () => {
      console.log(`iniciado ${app.get("port")}`)
    });
  })
};
