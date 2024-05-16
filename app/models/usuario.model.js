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
    }, id_rol: {
      type: Sequelize.INTEGER,
      references: {
        model: 'roles', // Nombre de la tabla de roles
        key: 'id_rol' // Clave primaria de la tabla de roless
      }
    }
  });

  return Usuario;
};

    