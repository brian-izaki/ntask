module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json(req.body);
  });
};
