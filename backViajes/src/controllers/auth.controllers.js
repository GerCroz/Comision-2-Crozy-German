import { createAccessToken } from "../utils/jwt.js";
import { UserModel } from "../models/user.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../settings/config.js";

export const crtlRegister = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        const userSaved = await user.save();
        res.status(201).json({
            user:{
                id:userSaved._id,
                username: userSaved.username,
                email: userSaved.email,
                createdAt: userSaved.createdAt,
                updateAt: userSaved.updateAt
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
}

export const ctrlLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userFound = await UserModel.findOne ({email});
        if (!userFound) return res.status(404).json(['invalid email or password']);

        const passwordIsMatch = await bcrypt.compare(password, userFound.password);
        if (!passwordIsMatch) return res.status(400).json(['Inavlid email or password']);

        const token = await createAccessToken({ userId: userFound._id});

        res.status(200).json({
            token,
            user: {
                id: userFound._id,
                username: userFound.username,
                avatar: userFound.avatarURL,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updateAt: userFound.updateAt
            }
        });
    } catch (error) {
        console.log(error);            
        res.status(500).json({message:'Internal Server Error'});
    }
}

export const verifyToken = async (req, res) => {
    const token = req.params.token;

    if (!token) return res.status(401).json({message: 'no hay'});

    jwt.verify(token, config.jwt_secret, async(err, user) => {
        if (err) return res.status(401).json({message: 'Unauthorized'});

        const userFound = await UserModel.findById(user.userId)

        if (!userFound) return res.status(401).json({message: 'Unauthorized'});

        return res.status(200).json({
            user: {
                id: userFound._id,
                username: userFound.username,
                avatar: userFound.avatarURL,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updateAt: userFound.updateAt
            }
        })

    })
}