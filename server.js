const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const app = express();
const session = require('express-session');

var corsOptions = {
  origin: "https://front24.onrender.com"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));
app.use(session({
  secret: 'your-secret-key', // Clave secreta para firmar la cookie de sesión
  resave: false,
  saveUninitialized: true
}));
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Res
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "FARMACIA EN LINEA." });
});


require("./app/routes/turorial.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/empleado.routes")(app);
require("./app/routes/proveedor.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/factura.routes")(app);
require("./app/routes/factura_detalle.routes")(app);
require("./app/routes/usuario.routes")(app);
require("./app/routes/carrito.routes")(app);
require("./app/routes/carrito_detalle.routes")(app)

const usuarioRoutes = require("./app/routes/usuario.routes");
app.use("/api/usuario", usuarioRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
