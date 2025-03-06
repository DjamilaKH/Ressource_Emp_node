module.exports = (sequelize, DataTypes) => {
    const ressource = sequelize.define('ressource', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      disponibilite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  
    ressource.associate = (models) => {
      ressource.hasMany(models.Emprunt, { foreignKey: 'ressourceId' });
    };
  
    return ressource;
  };