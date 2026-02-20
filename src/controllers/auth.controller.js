const { registerUser, loginUser } = require('../services/auth.service');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Generar token de 20 minutos
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '20m' });
};

// Registro
const register = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = await registerUser({ nombre, email, passwordHash });

    const token = generateToken(newUser._id);

    res.status(201).json({
      ok: true,
      message: 'Usuario creado correctamente',
      user: {
        id: newUser._id,
        nombre: newUser.nombre,
        email: newUser.email
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser({ email, password });

    const token = generateToken(user._id);

    res.json({
      ok: true,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

// Perfil
const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });

    res.json({ ok: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, profile };