import { param, body } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { applyValidations } from '../../middlewares/apply-validation.js';

// Validacion de los comentarios al momento de crar uno nuevo

export const createCommentValidation = [
    body('description')
    .notEmpty().withMessage('el campo {title} no debe estar vacio.')
    .isString().withMessage('el campo {title} debe ser un string.'),
    applyValidations,
];

// Validacion al actualizar un comentario

export const updateCommentValidation = [
    param('commentId')
    .notEmpty().withMessage('El parametro {commentId} no debe estar vacio,')
    .isString().withMessage('El parametro {commentId} debe ser un string,')
    .custom(isValidObjectId).withMessage('El parametro {commentId} no debe estar vacio,'),
    body('description')
    .optional()
    .notEmpty().withMessage('el campo {title} no debe estar vacio.')
    .isString().withMessage('el campo {title} debe ser un string.'),
    applyValidations,
];

//Validacion al eliminar un comentario

export const deleteCommentValidation = [
    param('commentId')
    .notEmpty().withMessage('El parametro {commentId} no puede estar vacio.')
    .isString().withMessage('El parametro {commentId} debe ser un String.')
    .custom(isValidObjectId).withMessage('El parametro {commentId} debe ser una Id valida.'),
    applyValidations
];