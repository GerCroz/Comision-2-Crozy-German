import jwt from 'jsonwebtoken';
import { config } from "../settings/config.js";

export const  createAccessToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            config.jwt_secret,
            {
                expiresIn: '1d'
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
};

export const verifyJWT = async ({token}) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt_secret, (err, decoded) => {
            if (err || !decoded.userId) reject('Invalid token');
            resolve(decoded);
        });
    });
};