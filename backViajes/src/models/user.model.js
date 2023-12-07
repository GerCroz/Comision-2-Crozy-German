import mongoose, { Schema } from "mongoose";
import * as bcrypt from 'bcrypt';

// estructura de usuario
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        avatarURL: {
            type: String,
            required: true,
        },
        posts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    {
        timestamps: true,
        versionKey:false,
    }
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

export const UserModel = mongoose.model('User', UserSchema);