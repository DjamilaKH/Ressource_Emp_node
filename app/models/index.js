const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importation des modèles
db.user = require("./users.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
db.emprunt = require("./emprunt.js")(sequelize, Sequelize);
db.ressource = require("./ressources.js")(sequelize, Sequelize);

// Ne pas définir d'associations entre 'emprunt', 'utilisateur', et 'ressource'
// Supprimer les lignes suivantes si vous ne voulez pas d'associations :
// db.user.hasMany(db.emprunt, { foreignKey: 'userId' });
// db.emprunt.belongsTo(db.user, { foreignKey: 'userId' });

// db.ressource.hasMany(db.emprunt, { foreignKey: 'ressourceId' });
// db.emprunt.belongsTo(db.ressource, { foreignKey: 'ressourceId' });

module.exports = db;
