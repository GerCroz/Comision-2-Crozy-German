import mongoose, {Schema} from "mongoose";

//modelo de datos del posteo , incluye datos requeridos de usuario
const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageURL: {
            type: String,
            required: true
        },
        comments: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Comment',
            }
        ],
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

export const PostModel = mongoose.model('Post', PostSchema);