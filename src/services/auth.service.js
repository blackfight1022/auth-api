const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/apiError');

const registerUser = async ({ nombre, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError('El usuario ya existe', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    nombre,
    email,
    passwordHash
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError('Credenciales inválidas', 400);
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new ApiError('Credenciales inválidas', 400);
  }

  return generateToken(user);
};

module.exports = { registerUser, loginUser };
