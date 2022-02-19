module.exports = function(sequelize, dataTypes) {
    
    let alias = "Genre"; 
    
    let cols = {  
        id_genre: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        }  
    }
    
    let config = {
        tableName: "genre",
        timestamps: false
    }

    let Genre = sequelize.define(alias, cols, config);


    return Genre

}