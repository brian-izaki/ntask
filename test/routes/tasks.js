const { request, expect } = require("../helpers"),
  jwt = require("jwt-simple"),
  cfg = require("../../libs/config")(),
  Users = require("../../models/Users"),
  Tasks = require("../../models/Tasks");

describe("Routes: tasks", () => {
  let token, fakeTask;

  beforeEach((done) => {
    Tasks.destroy({ where: {} }).then(async () => {
      try {
        await Users.destroy({ where: { name: "olaTasks" } });

        let user = await Users.create({
          name: "olaTasks",
          email: "olaTask@teste.com",
          password: "123",
        });

        let tasks = await Tasks.bulkCreate([
          { id: 1, tittle: "work", user_id: user.id },
          { id: 2, tittle: "study", user_id: user.id },
        ]);

        fakeTask = tasks[0];
        token = jwt.encode({ id: user.id }, cfg.jwtSecret);
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
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
              expect(res.body).to.have.length(2);
              expect(res.body[0].tittle).to.eql("work");
              expect(res.body[1].tittle).to.eql("study");
              done(err);
            });
        } catch (err) {
          console.log(err);
          done(err);
        }
      });
    });
  });
  
  describe("POST /tasks", () => {
    describe("status 200", () => {
      it("create a new Task", (done) => {
        request
          .post("/tasks")
          .set("Authorization", `Bearer ${token}`)
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
          .set("Authorization", `Bearer ${token}`)
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
          .get(`/tasks/0`)
          .set("Authorization", `Bearer ${token}`)
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
          .set("Authorization", `Bearer ${token}`)
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
          .set("Authorization", `Bearer ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
});
