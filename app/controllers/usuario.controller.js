const db = require("../models");
const Usuario = db.usuario;
const bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;

// Crear y Guardar un Nuevo Usuario
exports.create = (req, res) => {
  // Verificar que se proporcionen todos los campos requeridos
  if (!req.body.usuario || !req.body.contraseña || !req.body.email || !req.body.nombre || !req.body.apellido || !req.body.direccion || !req.body.telefono) {
    res.status(400).send({
      message: "All fields are required!"
    });
    return;
  }

  // Generar un hash para la contraseña
  const hashedPassword = bcrypt.hashSync(req.body.contraseña, 10);

  // Crear un objeto usuario con los datos proporcionados
  const usuario = {
    usuario: req.body.usuario,
    contraseña: req.body.contraseña,
    email: req.body.email,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono
  };

  // Guardar el usuario en la base de datos
  Usuario.create(usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};

// Recuperar todos los Usuarios de la base de datos.
exports.findAll = (req, res) => {
  const usuario = req.query.usuario;
  var condition = usuario ? { usuario: { [Op.iLike]: `%${usuario}%` } } : null;

  Usuario.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};

// Recuperar un Usuario por su ID
exports.findOne = (req, res) => {
  const id_usuario = req.params.id_usuario;

  Usuario.findByPk(id_usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id_usuario=" + id_usuario
      });
    });
};

// Actualizar un Usuario por su ID
exports.update = (req, res) => {
  const id_usuario = req.params.id_usuario;

  Usuario.update(req.body, {
    where: { id_usuario: id_usuario }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id_usuario=${id_usuario}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id_usuario=" + id_usuario
      });
    });
};

// Eliminar un Usuario por su ID
exports.delete = (req, res) => {
  const id_usuario = req.params.id_usuario;

  Usuario.destroy({
    where: { id_usuario: id_usuario }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id_usuario=${id_usuario}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id_usuario=" + id_usuario
      });
    });
};

// Eliminar todos los Usuarios de la base de datos.
exports.deleteAll = (req, res) => {
  Usuario.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users."
      });
    });
};
