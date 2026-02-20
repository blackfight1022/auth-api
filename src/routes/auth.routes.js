const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/auth.controller');
const protect = require('../middlewares/auth.middleware');
const validateFields = require('../middlewares/validation.middleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('nombre').notEmpty().withMessage('Nombre obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener mínimo 6 caracteres'),
    validateFields
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Password obligatorio'),
    validateFields
  ],
  login
);

router.get('/profile', protect, require('../controllers/auth.controller').profile);

module.exports = router;
