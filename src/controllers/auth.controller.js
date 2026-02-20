const { registerUser, loginUser } = require('../services/auth.service');
const User = require('../models/user.model');

const register = async (req, res, next) => {
  try {
    await registerUser(req.body);

    res.status(201).json({
      ok: true,
      message: 'Usuario creado correctamente'
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await loginUser(req.body);

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');

    res.json({
      ok: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, profile };
