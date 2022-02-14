const express = require("express");
const router = express.Router();
const path = require("path");
const usersController = require("../controllers/usersController");

  router.post("/register", usersController.register);
  router.post("/login", usersController.login);
 

module.exports = router;