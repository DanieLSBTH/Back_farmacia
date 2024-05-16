module.exports = app => {
  const db = require("../models");  
  const Usuario = db.usuario;
  const usuarios = require("../controllers/usuario.controller.js");
    const router = require("express").Router();
    const bcrypt = require('bcrypt');
   

    // Crear un nuevo Usuario
    // usuario.routes.js

// ...

// Iniciar sesión
// Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Buscar al usuario por su nombre de usuario
    const user = await Usuario.findOne({ where: { usuario } });

    // Si no se encuentra el usuario, devolver un error
    if (!user) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    // Comparar la contraseña ingresada con la contraseña almacenada
    if (contraseña !== user.contraseña) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }

    // Si la autenticación es exitosa, devolver un mensaje de éxito
    return res.json({ success: true, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});


    // Recuperar todos los Usuarios
    router.get("/", usuarios.findAll);
  
    // Recuperar un Usuario por su ID
    router.get("/:id_usuario", usuarios.findOne);
  
    // Actualizar un Usuario por su ID
    router.put("/:id_usuario", usuarios.update);
  
    // Eliminar un Usuario por su ID
    router.delete("/:id_usuario", usuarios.delete);
  
    // Eliminar todos los Usuarios
    router.delete("/", usuarios.deleteAll);
  
    app.use("/api/usuario", router);
  };
  