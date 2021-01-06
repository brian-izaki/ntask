const { request, expect } = require("../helpers"),
  jwt = require("jwt-simple"),
  cfg = require("../../libs/config")(),
  Users = require("../../models/Users"),
  Tasks = require("../../models/Tasks");

describe("Routes: tasks", () => {
  let token, fakeTask;

  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() =>
        Users.create({
          name: "brian",
          email: "brian@teste.com",
          password: "1234",
        })
      )
      .then(async (user) => {
        try {
          await Tasks.destroy({ where: {} });

          let tasks = await Tasks.bulkCreate([
            { id: 1, tittle: "work", user_id: user.id },
            { id: 2, tittle: "study", user_id: user.id },
          ]);
          fakeTask = tasks[0];
          token = jwt.encode({ id: user.id, email: user.email }, cfg.jwtSecret);
          done();
        } catch (error) {
          console.log(error);
        }
      });
  });

  describe("GET /tasks", () => {
    describe("status 200", () => {
      it("Return a list of tasks", (done) => {
        try {
          request
            .get("/tasks")
            .set("Authorization", `JWT ${token}`)
            .expect(200)
            .end((err, res) => {
              console.log(res.body);
              console.log(err);
              expect(res.body).to.have.length(2);
              expect(res.body[0].tittle).to.eql("work");
              expect(res.body[1].tittle).to.eql("study");
              done(err);
            });
        } catch (err) {
          console.log(err);
        }
      });
    });
  });

  describe("POST /tasks", () => {
    describe("status 200", () => {
      it("create a new Task", (done) => {
        request
          .post("/tasks")
          .set("Authorization", `JWT ${token}`)
          .send({ tittle: "Run" })
          .expect(200)
          .end((err, res) => {
            expect(res.body.tittle).to.eql("Run");
            expect(res.body.done).to.be.false;
            done(err);
          });
      });
    });
  });

  describe("GET /tasks/:id", () => {
    describe("status 200", () => {
      it("Return one task", (done) => {
        request
          .get(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.tittle).to.eql("work");
            done(err);
          });
      });
    });

    describe("status 404", () => {
      it("Throws error when task not exist", (done) => {
        request
          .get(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(404)
          .end((err, res) => done(err));
      });
    });
  });

  describe("PUT /tasks/:id", () => {
    describe("status 204", () => {
      it("updated task", (done) => {
        request
          .put(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .send({
            tittle: "Travel",
            done: true,
          })
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });

  describe("DELETE /tasks/:id", () => {
    describe("status 204", () => {
      it("remove a task", (done) => {
        request
          .delete(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
});
