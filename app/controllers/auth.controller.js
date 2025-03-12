const db = require("../models");
const User = db.user;
const Role = db.role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

exports.signup = (req, res) => {
  console.log("Rôle demandé depuis la requête : ", req.body.role); // Log du rôle passé dans la requête

  // Recherche insensible à la casse du rôle
  Role.findOne({
    where: db.sequelize.where(db.sequelize.fn('LOWER', db.sequelize.col('name')), req.body.role.toLowerCase())
  })
  .then((role) => {
    if (!role) {
      console.log("Rôle introuvable : ", req.body.role); // Log si le rôle n'est pas trouvé
      return res.status(400).send({ message: "Rôle invalide !" });
    }

    const user = {
      nom: req.body.nom,
      email: req.body.email,
      roleId: role.id,
      password: bcrypt.hashSync(req.body.password, 8),
    };

    User.create(user)
      .then(() => res.status(201).send({ message: "Utilisateur créé avec succès !" }))
      .catch((err) => res.status(500).send({ message: err.message }));
  })
  .catch((err) => {
    console.error("Erreur lors de la recherche du rôle : ", err);
    res.status(500).send({ message: err.message });
  });
};

exports.signin = (req, res) => {
  User.findOne({ 
    where: { email: req.body.email },
    include: [{ model: Role, as: 'userRole' }]  // Assurez-vous que le modèle 'Role' est bien défini
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé." });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Mot de passe incorrect !" });
      }

      const token = jwt.sign({ id: user.id, role: user.userRole.name }, config.secret, {
        expiresIn: 86400, // 24 heures
      });

      res.status(200).send({
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.userRole.name,
        accessToken: token,
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
