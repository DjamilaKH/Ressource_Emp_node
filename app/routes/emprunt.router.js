const express = require('express');
const router = express.Router();
const emprunt = require("../controllers/empruntcontroller");

// Définir les routes
router.post("/", emprunt.create); // Créer un emprunt
router.get("/", emprunt.findAll); // Récupérer tous les emprunts
router.get("/:id", emprunt.findOne); // Récupérer un emprunt par ID
router.put("/:id", emprunt.update); // Mettre à jour un emprunt
router.delete("/:id", emprunt.remove); // Supprimer un emprunt

module.exports = router;
