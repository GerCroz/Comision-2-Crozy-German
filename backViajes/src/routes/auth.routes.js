import { Router } from "express";
import { crtlRegister, ctrlLogin, verifyToken } from "../controllers/auth.controllers.js";
import { loginValidation, registerValidation } from "../models/validations/auth.validation.js";


export const authRouter = Router();

authRouter.post('/register', registerValidation, crtlRegister);

authRouter.post('/login', ctrlLogin);

authRouter.get('/verify/:token', verifyToken);
