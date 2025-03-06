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
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importation des modèles
db.user = require("./users.js")(sequelize, Sequelize);
db.emprunt = require("../models/emprunt.js")(sequelize, Sequelize);
db.ressource = require("../models/ressources.js")(sequelize, Sequelize);
db.role = require("../models/role.js")(sequelize, Sequelize);

// Définition des associations
db.user.hasMany(db.emprunt, { foreignKey: 'userId' });
db.emprunt.belongsTo(db.user, { foreignKey: 'userId' });

db.ressource.hasMany(db.emprunt, { foreignKey: 'ressourceId' });
db.emprunt.belongsTo(db.ressource, { foreignKey: 'ressourceId' });

// Association utilisateur ↔ rôle (1 utilisateur peut avoir 1 rôle)
// Association utilisateur ↔ rôle (1 utilisateur peut avoir 1 rôle)
db.role.hasMany(db.user, { foreignKey: 'roleId', as: 'users' });
db.user.belongsTo(db.role, { foreignKey: 'roleId', as: 'userRole' });

db.ROLES = ["user", "admin"];

module.exports = db;
