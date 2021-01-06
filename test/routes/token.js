const { username } = require("../../libs/config.development");
const { request, expect } = require("../helpers"),
  Users = require("../../models/Users");

describe("Routes: Token", () => {
  describe("POST /token", () => {
    
    // código executado antes de CADA teste
    beforeEach((done) => {
      Users.destroy({ where: {} }).then(() =>
        Users.create({
          name: "brian",
          email: "brian@teste.com",
          password: "1234",
        }).then(done())
      );
    });

    describe("status 200", () => {
      it("returned authenticated token", (done) => {
        request
          .post("/token")
          .send({ email: "brian@teste.com", password: "1234" }) // realiza a request
          .expect(200) // no retorno é esperado 200
          .end((err, res) => {
            // com esse retorno...
            expect(res.body).to.include.keys("token"); // no corpo tem a chave token??
            done(err); // finaliza o teste desse escopo
          });
      });
    });

    describe("status 401", () => {
      it("Throw error when password is incorrect", (done) => {
        request
          .post("/token")
          .send({ email: "brian@teste.com", password: "errado" })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });

      it("Throw error when email not exist", (done) => {
        request
          .post("/token")
          .send({ email: "errado", password: "errado" })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });

      it("throw error when email and password are blank", (done) => {
        request
          .post("/token")
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});
