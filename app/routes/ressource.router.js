module.exports = app => {
  const ressources = require("../controllers/ressource.controller");
  const router = require("express").Router();

  router.post("/", ressources.create);
  router.get("/", ressources.findAll);
  router.get("/:id", ressources.findOne);
  router.put("/:id", ressources.update);
  router.delete("/:id", ressources.delete);
  router.patch("/:id/status", ressources.toggleAvailability);
  app.use('/api/ressources', router);
};
