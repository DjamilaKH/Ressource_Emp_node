module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "jamila99",
    DB: "ressources_Wiss",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };