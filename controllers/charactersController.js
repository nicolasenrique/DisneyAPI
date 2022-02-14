const path = require("path");
let db = require("../database/models");

const controlCharacters = {
    list: (req, res) =>  {
    db.Character.findAll({include: [{association: "movies" }]})
    
    .then(function(characters){
        res.json(characters)
    })
 }
}

module.exports = controlCharacters