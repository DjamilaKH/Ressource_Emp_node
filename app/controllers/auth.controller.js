// app/controllers/auth.controller.js
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");

exports.signup = (req, res) => {
  const user = {
    nom: req.body.nom,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8)
  };

  User.create(user)
    .then((data) => res.status(201).send({ message: "Utilisateur créé avec succès !" }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.signin = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé." });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Mot de passe incorrect !" });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, config.secret, {
        expiresIn: 86400 // 24 heures
      });

      res.status(200).send({
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        accessToken: token
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};