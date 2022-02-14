module.exports = function (sequelize, dataTypes) {
    let alias = "User";
  
    let cols = {
      id_user: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: dataTypes.STRING,
      },
      last_name: {
        type: dataTypes.STRING,
      },
      email: {
        type: dataTypes.STRING,
      },
      password: {
        type: dataTypes.STRING,
      },
      token: {
        type: dataTypes.STRING,
      }
    };
  
    let config = {
      tableName: "user",
      timestamps: false,
    };
  
    let User = sequelize.define(alias, cols, config);
    
    return User;
  };
  