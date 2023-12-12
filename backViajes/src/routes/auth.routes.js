import { Router } from "express";
import { crtlRegister, ctrlLogin, verifyToken } from "../controllers/auth.controllers.js";


export const authRouter = Router();

authRouter.post('/register', crtlRegister);

authRouter.post('/login', ctrlLogin);

authRouter.get('/veryfy/:token', verifyToken);
