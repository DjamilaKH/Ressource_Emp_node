const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// Créer et sauvegarder un nouvel utilisateur
exports.create = (req, res) => {
  if (!req.body.nom || !req.body.email || !req.body.roleId) {
    return res.status(400).send({
      message: "Le nom, l'email et le rôle sont requis !"
    });
  }

  Role.findByPk(req.body.roleId)
    .then((role) => {
      if (!role) {
        return res.status(404).send({ message: "Rôle non trouvé !" });
      }

      User.create({
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId,
      })
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Récupérer tous les utilisateurs avec leur rôle
exports.findAll = (req, res) => {
  User.findAll({ include: [{ model: Role, as: 'userRole' }] })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Récupérer un utilisateur par ID avec son rôle
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, { include: [{ model: Role, as: 'userRole' }] })
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Utilisateur non trouvé avec id=${id}` });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Mettre à jour un utilisateur
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Utilisateur mis à jour avec succès." });
      else res.send({ message: `Impossible de mettre à jour l'utilisateur avec id=${id}.` });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Supprimer un utilisateur
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Utilisateur supprimé avec succès !" });
      else res.send({ message: `Utilisateur non trouvé avec id=${id}.` });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Supprimer tous les utilisateurs
exports.deleteAll = (req, res) => {
  User.destroy({ where: {}, truncate: false })
    .then((nums) => res.send({ message: `${nums} utilisateurs supprimés !` }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Récupérer les utilisateurs avec condition sur le nom
exports.findByName = (req, res) => {
  const nom = req.query.nom;
  const condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

  User.findAll({ where: condition, include: [{ model: Role, as: 'userRole' }] })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};
