const express = require("express");
const router = express.Router();
const path = require("path");
const usersController = require("../controllers/usersController");
const auth = require("../middlewares/auth");

//Middlewares
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/img/users");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  var upload = multer({ storage: storage });

  router.post("/register", usersController.register);
  router.post("/login", usersController.login);
 

  module.exports = router;