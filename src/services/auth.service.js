const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const ApiError = require('../utils/apiError');

// Registro
const registerUser = async ({ nombre, email, passwordHash }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError('El usuario ya existe', 400);
  }

  const user = await User.create({
    nombre,
    email,
    passwordHash
  });

  return user;
};

// Login
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError('Credenciales inválidas', 400);

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new ApiError('Credenciales inválidas', 400);

  return user;
};

module.exports = { registerUser, loginUser };