const express = require('express');
const { body } = require('express-validator');
const { register, login, profile } = require('../controllers/auth.controller');
const protect = require('../middlewares/auth.middleware');
const validateFields = require('../middlewares/validation.middleware');

const router = express.Router();

// Registro
router.post(
  '/register',
  [
    body('nombre')
      .notEmpty().withMessage('Nombre obligatorio')
      .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo puede contener letras y espacios'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener mínimo 6 caracteres'),
    validateFields
  ],
  register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Password obligatorio'),
    validateFields
  ],
  login
);

// Perfil protegido
router.get('/profile', protect, profile);

module.exports = router;