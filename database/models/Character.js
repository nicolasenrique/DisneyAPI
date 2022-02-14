module.exports = function (sequelize, dataTypes) {
    let alias = "Character";
  
    let cols = {
      id_character: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: dataTypes.STRING,
      },
      name: {
        type: dataTypes.STRING,
      },
      age: {
        type: dataTypes.INTEGER,
      },
      weight: {
        type: dataTypes.DOUBLE,
      },
      history: {
        type: dataTypes.STRING,
      }
    };
  
    let config = {
      tableName: "character",
      timestamps: false,
    };
  
    let Character = sequelize.define(alias, cols, config);

    Character.associate = function(models) {
      Character.belongsToMany(models.Movie, {
          as: "movies",
          through: "character_movie",
          foreignKey: "character_id",
          otherKey: "movie_id",
          timestamps: false
      })
    }
    return Character;
  };
  