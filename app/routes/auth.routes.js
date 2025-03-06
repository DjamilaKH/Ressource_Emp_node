module.exports = (app) => {
    const authController = require("../controllers/auth.controller");
  
    const router = require("express").Router();
  
    router.post("/signup", authController.signup);
    router.post("/signin", authController.signin);
  
    app.use('/api/auth', router);
  };