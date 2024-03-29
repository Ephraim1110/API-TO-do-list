module.exports = {
    create: async function(req, res) {
      try {
        const task = await Task.create(req.body).fetch();
        return res.json(task);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    find: async function(req, res) {
      try {
        const tasks = await Task.find();
        return res.json(tasks);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    findOne: async function(req, res) {
      try {
        const task = await Task.findOne({ id: req.params.id });
        if (!task) return res.notFound();
        return res.json(task);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    update: async function(req, res) {
      try {
        const updatedTask = await Task.updateOne({ id: req.params.id }).set(req.body);
        if (!updatedTask) return res.notFound();
        return res.json(updatedTask);
      } catch (error) {
        return res.serverError(error);
      }
    },
  
    destroy: async function(req, res) {
      try {
        const deletedTask = await Task.destroyOne({ id: req.params.id });
        if (!deletedTask) return res.notFound();
        return res.json(deletedTask);
      } catch (error) {
        return res.serverError(error);
      }
    }
  };
  