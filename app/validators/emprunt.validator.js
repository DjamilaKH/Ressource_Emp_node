// const { body } = require('express-validator');

// // Validation pour la création d'un emprunt
// exports.createEmpruntValidator = [
//   body('utilisateurId').notEmpty().withMessage('Utilisateur ID est requis'),
//   body('ressourceId').notEmpty().withMessage('Ressource ID est requis'),
//   body('dateEmprunt').isDate().withMessage('Date d\'emprunt doit être une date valide'),
//   body('dateRetourR').optional().isDate().withMessage('Date de retour prévue doit être une date valide'),
// ];

// // Validation pour la mise à jour d'un emprunt
// exports.updateEmpruntValidator = [
//   body('dateRetourR').optional().isDate().withMessage('Date de retour prévue doit être une date valide'),
//   body('dateRetourE').optional().isDate().withMessage('Date de retour effective doit être une date valide'),
// ];
