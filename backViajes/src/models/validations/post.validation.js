import { param, body } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { applyValidations } from '../../middlewares/apply-validation.js';

//Validacion del posteo, al crear uno nuevo

export const createPostValidation = [
    body('title')
    .notEmpty().withMessage('El parametro {title} no debe estar vacio,')
    .isString().withMessage('El parametro {title} debe ser un string,'),
    body('description')
    .notEmpty().withMessage('El campo {description} no debe estar vacio.')
    .isString().withMessage('El campo {description} debe ser un string.'),
    body('imageURL')
    .notEmpty().withMessage('El campo {imageURL} no debe estar vacio.')
    .isString().withMessage('El campo {imageURL} debe ser un string.')
    .isURL().withMessage('El campo { imageURL } debe ser una URL valida.'),
    applyValidations,
];

//Validacion del Posteo al actualizar 

export const updatePostValidation = [
    param('id')
    .notEmpty().withMessage('El parametro { id } no debe estar vacio,')
    .isString().withMessage('El parametro { id } debe ser un string,')
    .custom(isValidObjectId).withMessage('El parametro { id } no debe estar vacio,'),
    body('title')
    .optional()
    .notEmpty().withMessage('El parametro {title} no debe estar vacio,')
    .isString().withMessage('El parametro {title} debe ser un string,'),
    body('description')
    .optional()
    .notEmpty().withMessage('El campo {description} no debe estar vacio.')
    .isString().withMessage('El campo {description} debe ser un string.'),
    body('imageURL')
    .optional()
    .notEmpty().withMessage('El campo {imageURL} no debe estar vacio.')
    .isString().withMessage('El campo {imageURL} debe ser un string.')
    .isURL().withMessage('El campo { imageURL } debe ser una URL valida.'),
    applyValidations,
];

// Validacion al momento de eliminar un Posteo
export const deletePostValidation = [
param('id')
.notEmpty().withMessage('El campo {id} no debe estar vacio ')
.isString().withMessage('El parametro { id } debe ser un string.')
.custom(isValidObjectId).withMessage('El parametro { id } debe ser una id valida.'),
applyValidations,
];