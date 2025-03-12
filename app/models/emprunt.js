const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid'); // Importer la fonction uuidv4 pour générer des UUID

module.exports = (sequelize) => {
  const emprunt = sequelize.define('emprunt', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4, // Générer automatiquement un UUID pour chaque nouvel emprunt
      allowNull: false,
    },
    dateEmprunt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateRetourR: {
      type: DataTypes.DATE,
    },
    dateRetourE: {
      type: DataTypes.DATE,
    },
  });

  return emprunt;
};
