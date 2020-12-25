const Tasks = require("../models/Tasks");

module.exports = (app) => {
  app.post("/tasks", async (req, res) => {
    try {
      const { tittle, done } = req.body;
      const task = await Tasks.build({ tittle, done });

      let validateErrors = await task.validate().catch(err => err.errors);
      if (validateErrors.length > 0) {
        let field = validateErrors[0].path;
        let message = validateErrors[0].message;

        return res.status(422).json({ field, message });
      }

      res.status(201).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  });
};
