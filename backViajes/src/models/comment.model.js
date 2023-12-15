import mongoose, {Schema} from "mongoose";
// Creacion de la estructura del modelo de datos para los comentarios del Posteo
const CommentSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    }, {
        timestamps: true,
        versionKey: false,
    }
);

export const CommentModel = mongoose.model('Comment', CommentSchema);