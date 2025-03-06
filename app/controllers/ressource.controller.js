// controllers/resource.controller.js
const db = require("../models");
const Resource = db.resources;
const Op = db.Sequelize.Op;

// Create a new resource (only admin)
exports.create = (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Access denied" });
  }

  const resource = {
    nom: req.body.nom,
    type: req.body.type,
    disponibilite: req.body.disponibilite || true,
  };

  Resource.create(resource)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Get all resources
exports.findAll = (req, res) => {
  Resource.findAll()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Update a resource (only admin)
exports.update = (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Access denied" });
  }

  Resource.update(req.body, { where: { id: req.params.id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Resource updated successfully." });
      } else {
        res.send({ message: "Resource not found or no change made." });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Delete a resource (only admin)
exports.delete = (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Access denied" });
  }

  Resource.destroy({ where: { id: req.params.id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Resource deleted successfully." });
      } else {
        res.send({ message: "Resource not found." });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Toggle resource availability (only admin)
exports.toggleAvailability = (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Access denied" });
  }

  Resource.findByPk(req.params.id)
    .then((resource) => {
      if (!resource) return res.status(404).send({ message: "Resource not found." });

      resource.update({ disponibilite: !resource.disponibilite })
        .then(() => res.send({ message: "Resource availability updated." }))
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

