const { request, expect } = require("../helpers");

describe("Routes: index", () => {
  describe("GET /", () => {
    it("returns the API status", (done) => {
      
      request // request vem da dependencia supertest
        .get("/")
        .expect(200) // expect vem do chai
        .end((err, res) => {

          // realiza a verificação
          const expected = { status: "NTask API" };
          expect(res.body).to.eql(expected);
          
          done(err);
        });

    });
  });
});
