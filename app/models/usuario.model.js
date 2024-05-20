const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    id_usuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario: {
      type: Sequelize.STRING
    },
    contraseña: {
      type: Sequelize.STRING,
    
    },
    email: {
      type: Sequelize.STRING
    },
    nombre: {
      type: Sequelize.STRING
    },
    apellido: {
      type: Sequelize.STRING
    },
    direccion: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING
    }, rol: {
      type: Sequelize.STRING
    }
  });

  return Usuario;
};

    