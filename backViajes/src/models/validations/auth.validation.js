import { header } from 'express-validator';
import { applyValidations } from '../../middlewares/apply-validation.js';

//
export const authHeader = [
    header('authorization')
    .exists().withMessage('debe enviar el header { Authorization } con el token.'),
    applyValidations
];