module.exports = app => {
    const ressources = require("../controllers/ressource.controller.js");
    const router = require("express").Router();
  
    // Middleware pour vérifier si l'utilisateur est administrateur
    const isAdmin = (req, res, next) => {
      if (req.user && req.user.role === 'admin') {
        next();
      } else {
        res.status(403).send({ message: "Accès interdit : réservé aux administrateurs." });
      }
    };
  
    // Créer une ressource (Admin uniquement)
    router.post("/", isAdmin, ressources.create);
  
    // Récupérer toutes les ressources
    router.get("/", ressources.findAll);
  
    // Récupérer une ressource par ID
    router.get("/:id", ressources.findOne);
  
    // Mettre à jour une ressource (Admin uniquement)
    router.put("/:id", isAdmin, ressources.update);
  
    // Supprimer une ressource (Admin uniquement)
    router.delete("/:id", isAdmin, ressources.delete);
  
    // Changer le statut de disponibilité d'une ressource (Admin uniquement)
    router.patch("/:id/status", isAdmin, ressources.changeStatus);
  
    app.use('/api/ressources', router);
  };
  
  // Tu peux tester avec Postman :
  // - POST /api/ressources (créer une ressource)
  // - GET /api/ressources (voir toutes les ressources)
  // - PUT /api/ressources/:id (modifier une ressource)
  // - DELETE /api/ressources/:id (supprimer une ressource)
  // - PATCH /api/ressources/:id/status (changer la disponibilité)
  
  