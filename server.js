const express = require("express");
const cors = require("cors");

const app = express();

// Configuration des options CORS
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// Synchroniser la base de données sans réinitialisation
db.sequelize.sync() 
  .then(() => {
    console.log("Base de données synchronisée !");
  })
  .catch((err) => {
    console.log("Échec de la synchronisation de la base de données : " + err.message);
  });

// Route simple
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Importation des routes utilisateurs, auth, ressources, emprunt
const userRouter = require("./app/routes/user.router");
const authRouter = require("./app/routes/auth.routes");
const ressourceRouter = require("./app/routes/ressource.router");
const empruntRouter = require("./app/routes/emprunt.router");

// Définir les routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/ressources", ressourceRouter);
app.use('/api/emprunt', empruntRouter);  // Ici, vous ajoutez directement le router

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
