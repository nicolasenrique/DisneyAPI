const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const app = express();
const session = require('express-session');


// enable cors in app
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: "Shhh, it's a secret",
  resave: false,
  saveUninitialized: false
}));

const path = require("path");
const methodOverride = require('method-override'); // In order to use PUT and DELETE 
const publicPath = path.resolve(__dirname, "./public");

//Routes
// const mainRouter = require("./routes/main");
const usersRouter = require("./routes/users");

//app.use(express.urlencoded({extended: false}));
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method')); 


// app.use("/", mainRouter);
app.use("/api/v1/auth", usersRouter);




app.listen(process.env.PORT || 3000, function () {
  console.log("Server 3000 running");
});

app.use(express.static(publicPath));


