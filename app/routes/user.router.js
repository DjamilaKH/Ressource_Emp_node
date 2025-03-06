module.exports = app => {
    const users = require("../controllers/user.controller");
  
    var router = require("express").Router();
  
    // Créer un nouvel utilisateur
    router.post("/", users.create);
  
    // Récupérer tous les utilisateurs
    router.get("/", users.findAll);
  
    // Récupérer un utilisateur avec son id
    router.get("/:id", users.findOne);
  
    // Mettre à jour un utilisateur avec son id
    router.put("/:id", users.update);
  
    // Supprimer un utilisateur avec son id
    router.delete("/:id", users.delete);
  
    // Supprimer tous les utilisateurs
    router.delete("/", users.deleteAll);
  
    app.use('/api/user', router);
  };