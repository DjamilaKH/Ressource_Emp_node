// const jwt = require('jsonwebtoken');
// const config = require('../config/auth.config');
// const db = require('../models');
// const User = db.User;
// const Role = db.Role;

// // Middleware pour vérifier le token JWT
// verifyToken = (req, res, next) => {
//   const token = req.headers['x-access-token'];

//   if (!token) {
//     return res.status(403).send({ message: "Aucun token fourni !" });
//   }

//   jwt.verify(token, config.secret, async (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "Non autorisé !" });
//     }

//     try {
//       // Récupérer l'utilisateur avec son rôle
//       const user = await User.findByPk(decoded.id, {
//         include: [{
//           model: Role,
//           attributes: ['name']
//         }]
//       });

//       if (!user) {
//         return res.status(404).send({ message: "Utilisateur non trouvé !" });
//       }

//       req.userId = user.id;
//       req.role = user.Role ? user.Role.name : null;

//       next();
//     } catch (error) {
//       return res.status(500).send({ message: "Erreur serveur !" });
//     }
//   });
// };

// // Middleware pour vérifier si l'utilisateur est un admin
// isAdmin = (req, res, next) => {
//   if (req.role === 'admin') {
//     return next();
//   }
//   return res.status(403).send({ message: "Requiert le rôle admin !" });
// };

// // Middleware pour vérifier si l'utilisateur est un employé
// isEmploye = (req, res, next) => {
//   if (req.role === 'employe') {
//     return next();
//   }
//   return res.status(403).send({ message: "Requiert le rôle employé !" });
// };

// module.exports = {
//   verifyToken,
//   isAdmin,
//   isEmploye,
// };
