const db = require("./app/models");
const Role = db.role;

db.sequelize.sync().then(() => {
  Role.bulkCreate([
    { name: "admin" },
    { name: "employe" }
  ])
    .then(() => {
      console.log("Rôles insérés avec succès !");
      process.exit();
    })
    .catch((err) => {
      console.error("Erreur lors de l'insertion des rôles :", err);
      process.exit(1);
    });
});
