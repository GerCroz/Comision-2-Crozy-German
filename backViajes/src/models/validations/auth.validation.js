import { body, header } from 'express-validator';
import { applyValidations } from '../../middlewares/apply-validation.js';
//
export const authHeader = [
    header('authorization')
    .exists().withMessage('debe enviar el header { Authorization } con el token.'),
    applyValidations
];

export const registerValidation = [
    body('avatarURL')
    .notEmpty().withMessage('El campo { avatarURL } no debe estar vacio.')
    .isString().withMessage('El campo { avatarURL } no debe ser')
    .isURL().withMessage('El campo { avatarURL } debe ser una URL valida.'),
    body('email')
      .notEmpty().withMessage('El campo { email } no debe estar vacio.')
      .isString().withMessage('El campo { email } debe ser un string.')
      .isEmail().withMessage("El campo { email } debe ser un email valido."),
    body('username')
      .notEmpty().withMessage('El campo { username } no debe estar vacio.')
      .isString().withMessage('El campo { username } debe ser un string.'),
    body('password')
      .notEmpty().withMessage('El campo { password } no debe estar vacio.')
      .isString().withMessage('El campo { password } debe ser un string.'),
    applyValidations,
  ]
  
  export const loginValidation = [
    body('email')
      .notEmpty().withMessage('El campo { email } no debe estar vacio.')
      .isString().withMessage('El campo { email } debe ser un string.')
      .isEmail().withMessage("El campo { email } debe ser un email valido."),
    body('password')
      .notEmpty().withMessage('El campo { password } no debe estar vacio.')
      .isString().withMessage('El campo { password } debe ser un string.'),
    applyValidations,
  ]