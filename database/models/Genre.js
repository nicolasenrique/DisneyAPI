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
//Después del define, puedo escribir las asociaciones

    Genre.associate = function(models) {
        Genre.belongsTo(models.Movie, {
            as: "movies_genre",
            foreignKey: "movie_id"
        })
    }


    return Genre

}