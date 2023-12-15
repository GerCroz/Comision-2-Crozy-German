import { CommentModel} from "../models/comment.model.js";
import { PostModel } from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";
import { isAuthor } from "./post.controllers.js";

// controlador para los comentarios 
export const crtlGetComment = async (req, res) => {
    try {
        const comments = await CommentModel.find().populate("author", [
            "username",
            "avatarURL",
        ]);
        
        
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({error: error.message});   
    }
};

export const crtlGetComments = async (req, res) => {
    const {commentId} = req.params;

    try {
        const comment = await CommentModel.findOne({
            _id: commentId,
        }).populate("author", ["username", "avatarURL"]);

        if (!comment) {
            return res.status(400).json({error: "Comment not found"});
        }

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export const crtlGetCommentsPost = async (req, res) => {
    const {postId} = req.params;

    try {
        const comments = await CommentModel.find({ post: postId }).populate(
            "author",
            ["username", "avatarURL"]
        );

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({error:"Couldn't get comments for post"});
    }
};

// crear comentarios 
export const crtlCreateComment = async (req, res) => {
    //paso el id del post por parametro
    const {postId} = req.params;
    console.log(postId);
    const userId = req.user._id;

    try {
        const post = await PostModel.findOne({ 
            _id: postId 
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found"});
        }

        const comment = new CommentModel({
            ...req.body,
            post: postId,
            author: userId,
        });

        await comment.save();

        await PostModel.findOneAndUpdate(
            {_id: postId},
            {$push: { comments: comment._id } }
        );

        await UserModel.findOneAndUpdate(
            {_id: userId },
            {$push: { comments: comment._id }}
        );
        
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({error:"Couldn'create comment"});
    }
};

//actualizar un comentario
export const crtlUpdateComment = async (req, res) => {
    //paso por parametro el id del comentario a actualizar
    const { commentId } = req.params;
    const userId = req.user._id;

    const isComment = await isCommentAuthor ({ commentId, userId});

    if (!isComment) {
        return res.status(403).json({ error: "Comment Doesn't exist"});
    }

    try {
        const comment = await CommentModel.findOne({_id: commentId });

        if (!comment) {
            return res.status(404).json({ error: "Comment doesn't exist" });
        }

        comment.set(req.body);

        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Couldn't update comment"});
    }
};

//eliminar un comentario 
export const ctrlDeleteComment = async (req, res) => {
    const {commentId} = req.params;
    const userId = req.user._id;

    const isComment = await isCommentAuthor({ commentId, userId});

    if (!isComment){
        return res.status(403).json({ error: "User is not the comment author"});
    }

    try {
        await CommentModel.findOneAndDelete({ _id: commentId, author: userId });

        await PostModel.findOneAndDelete(
            { comments: commentId },
            {$pull: {comments: commentId }}
        );

        await UserModel.findByIdAndUpdate (
            {comments: commentId},
            {$pull: { comments: commentId }}
        );

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error:"Couldn't delete music"});
    }
};

export const isCommentAuthor = async ({ commentId, userId }) => {
    try {
        const comment = await CommentModel.findOne({
            _id: commentId,
            author: userId,
        });

        if (!comment) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};