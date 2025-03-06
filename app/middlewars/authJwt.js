const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: "Aucun token fourni !" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non autorisé !" });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

isAdmin = (req, res, next) => {
  if (req.userRole === 'admin') {
    next();
    return;
  }
  return res.status(403).send({ message: "Requiert le rôle admin !" });
};

isEmploye = (req, res, next) => {
  if (req.userRole === 'employe') {
    next();
    return;
  }
  return res.status(403).send({ message: "Requiert le rôle employé !" });
};

module.exports = {
  verifyToken,
  isAdmin,
  isEmploye,
};