import mongoose, {Schema} from "mongoose";

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

export const Postmodel = mongoose.model('Post', PostSchema);