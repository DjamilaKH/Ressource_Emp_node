module.exports = (sequelize, DataTypes) => {
    const emprunt = sequelize.define('emprunt', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
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
  
    emprunt.associate = (models) => {
      emprunt.belongsTo(models.Utilisateur, { foreignKey: 'utilisateurId' });
      emprunt.belongsTo(models.Ressource, { foreignKey: 'ressourceId' });
    };
  
    return emprunt;
  };