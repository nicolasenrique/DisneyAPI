module.exports = function (sequelize, dataTypes) {
    let alias = "Movie";
  
    let cols = {
      id_movie: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: dataTypes.STRING,
      },
      title: {
        type: dataTypes.STRING,
      },
      creation_date: {
        type: dataTypes.DATE,
      },
      RATING: {
        type: dataTypes.INTEGER,
      }
    };
  
    let config = {
      tableName: "movie",
      timestamps: false,
    };
  
    let Movie = sequelize.define(alias, cols, config);

    Movie.associate = function(models) {
      Movie.belongsToMany(models.Character, {
          as: "character",
          through: "character_movie",
          foreignKey: "movie_id",
          otherKey: "character_id",
          timestamps: false
      })
    }
    return Movie;
  };
  