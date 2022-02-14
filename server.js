const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// const recordarmeMiddleware = require('./middlewares/recordarmeMiddleware');
// const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


// habilitar cors policies en la app
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const path = require("path");
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE 
const publicPath = path.resolve(__dirname, "./public");

//Routes
// const mainRouter = require("./routes/main");
// const usersRouter = require("./routes/users");

//app.use(express.urlencoded({extended: false}));
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE


// app.use("/", mainRouter);
// app.use("/users", usersRouter);




app.listen(process.env.PORT || 3000, function () {
  console.log("Server 3000 running");
});

app.use(express.static(publicPath));


