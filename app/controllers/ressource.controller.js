const db = require("../models");
const Resource = db.ressource;

// Créer une ressource
exports.create = (req, res) => {
  if (!req.body.nom || !req.body.type) {
    return res.status(400).send({ message: "Nom et type sont requis." });
  }

  const resource = {
    nom: req.body.nom,
    type: req.body.type,
    disponibilite: req.body.disponibilite !== undefined ? req.body.disponibilite : true,
  };

  Resource.create(resource)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Récupérer toutes les ressources
exports.findAll = (req, res) => {
  Resource.findAll()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Récupérer une ressource par ID
exports.findOne = (req, res) => {
  const { id } = req.params;

  Resource.findByPk(id)
    .then((resource) => {
      if (!resource) return res.status(404).send({ message: "Ressource non trouvée." });
      res.send(resource);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Mettre à jour une ressource
exports.update = (req, res) => {
  const { id } = req.params;

  Resource.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Ressource mise à jour avec succès." });
      } else {
        res.status(404).send({ message: "Ressource non trouvée." });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Supprimer une ressource
exports.delete = (req, res) => {
  const { id } = req.params;

  Resource.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Ressource supprimée avec succès." });
      } else {
        res.status(404).send({ message: "Ressource non trouvée." });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Changer la disponibilité d'une ressource
exports.toggleAvailability = (req, res) => {
  const { id } = req.params;

  Resource.findByPk(id)
    .then((resource) => {
      if (!resource) return res.status(404).send({ message: "Ressource non trouvée." });

      resource.update({ disponibilite: !resource.disponibilite })
        .then(() => res.send({ message: "Disponibilité mise à jour." }))
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
