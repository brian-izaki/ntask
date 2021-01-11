module.exports = (app) => {
  /**
   * @api {get} / API Status
   * @apiGroup Status
   * @apiSuccess {String} status mensagem de status da API
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {"status": "NTask API"}
   * @apiDescription utilizando o description
   * 
   * outra linha com description
   */

  app.get("/", (req, res) => {
    res.json({ status: "NTask API" });
  });
};
