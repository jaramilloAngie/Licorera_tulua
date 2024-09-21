// Importar dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
require("dotenv").config(); // Importar dotenv para usar variables de entorno

// Crear una aplicación de Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Definir el esquema para los usuarios
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: Number, required: true },
  edad: { type: Number, required: true },
  contrasena: { type: String, required: true },
});

// Crear el modelo de usuario
const User = mongoose.model("User", userSchema);
// Ruta para registrar un nuevo usuario
app.post("/api/register", async (req, res) => {
  req.body.contrasena = bcryptjs.hashSync(req.body.contrasena, 10);
  const { nombre, email, telefono, edad, contrasena } = req.body;
  console.log(nombre, email, telefono, edad, contrasena);
  try {
    const newUser = new User({ nombre, email, telefono, edad, contrasena });
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito", newUser });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Ruta para obtener todos los usuarios
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// Ruta para iniciar sesión
app.post("/api/users/login", async (req, res) => {

  const { email, contrasena } = req.body;
  try {
    console.log(email,contrasena);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
   
    if (!bcryptjs.compare(contrasena, user.contrasena)) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    res.status(200).json({ message: "Inicio de sesión exitoso", user:user });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Iniciar el servidor en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
