const express = require("express");
const router = express.Router();
const path = require("path");
const moviesController = require("../controllers/moviesController");
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

  router.get("/search", auth, moviesController.search);
  router.get("/", auth, moviesController.list);
  router.post("/", auth, upload.single('img'), moviesController.store );
  router.put("/:id", auth, upload.single('img'), moviesController.update );
  router.delete("/:id", auth, moviesController.delete);
  router.get("/:id", auth, moviesController.detail)
  

  module.exports = router;