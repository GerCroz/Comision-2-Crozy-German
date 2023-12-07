import { UserModel } from '../models/user.model.js';
import { verifyJWT } from '../utils/jwt.js';

export const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const { userId} = await verifyJWT({token});

        const user = await UserModel.findOne({_id: userId });

        if (!user) return res.status(401).json({error: 'invalid token'});

        req.user = user;

        next();
    } catch (error) {
      res.status(401).json({error: 'invalid token'});
    }
};