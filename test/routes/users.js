const { request, expect } = require("../helpers"),
  jwt = require("jwt-simple"),
  cfg = require("../../libs/config")(),
  Users = require("../../models/Users");

describe("Routes: Users", () => {
  let token;
  beforeEach((done) => {
    Users.destroy({ where: { email: "brian@gmail.com" } })
      .then(() =>
        Users.create({
          name: "Brian",
          email: "brian@gmail.com",
          password: "1234",
        })
      )
      .then((user) => {
        token = jwt.encode({ id: user.id }, cfg.jwtSecret);
        done();
      })
      .catch((err) => console.log(err));
  });

  describe("GET /user", () => {
    describe("status 200", () => {
      it("returns a authorized user", (done) => {
        request
          .get("/user")
          .set("Authorization", `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql("Brian");
            expect(res.body.email).to.eql("brian@gmail.com");
            done(err);
          });
      });
    });
  });

  describe("DELETE /user", () => {
    describe("status 200", () => {
      it("delete an authorized user", (done) => {
        request
          .delete("/user")
          .set("Authorization", `Bearer ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });

  describe("POST /users", () => {
    describe("status 200", () => {
      it("create a new user", (done) => {
        request
          .post("/users")
          .send({
            name: "Lary",
            email: "lary@gmail.com",
            password: "qwert",
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql("Lary");
            expect(res.body.email).to.eql("lary@gmail.com");
            done(err);
          });
      });
    });
  });
});
