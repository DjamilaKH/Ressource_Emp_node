const db = require("../models");
const users = db.user;
const Op = db.Sequelize.Op;

// Créer et sauvegarder un nouvel user
exports.create = (req, res) => {
  if (!req.body.nom || !req.body.email) {
    return res.status(400).send({
      message: "Le nom et l'email sont requis !"
    });
  }

  const user = {
    id: req.body.id,
    nom: req.body.nom,
    email: req.body.email,
    role: req.body.role
  };

  users.create(user)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Récupérer tous les users
exports.findAll = (req, res) => {
  users.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Récupérer un user par ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  users.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `users non trouvé avec id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Mettre à jour un user
exports.update = (req, res) => {
  const id = req.params.id;

  users.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "users mis à jour avec succès." });
      else res.send({ message: `Impossible de mettre à jour l'user avec id=${id}.` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Supprimer un user
exports.delete = (req, res) => {
  const id = req.params.id;

  users.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "users supprimé avec succès !" });
      else res.send({ message: `users non trouvé avec id=${id}.` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Supprimer tous les users
exports.deleteAll = (req, res) => {
  users.destroy({ where: {}, truncate: false })
    .then(nums => res.send({ message: `${nums} users supprimés !` }))
    .catch(err => res.status(500).send({ message: err.message }));
};


// Tu peux me dire si tu souhaites ajouter d'autres fonctionnalités ou ajuster quelque chose ✌️
