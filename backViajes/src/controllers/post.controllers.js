import { CommentModel } from "../models/comment.model.js";
import { PostModel } from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";

export const ctrlGetPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
        .populate({
          path: "author",
          select: ["username", "avatarURL"],
        })
        .populate({
          path: "comments",
          select: ["description", "author", "createdAt"],
          populate: {
            path: "author",
            select: ["username", "avatarURL"],
          },
        });

        
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const ctrlGetPost = async (req, res) => {
    const { id } = req.params

    try {
        const post = await PostModel.findOne({
            _id: id
          })
        .populate('author', ['username', 'avatarURL'])

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
      
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const ctrlCreatePost = async (req, res) => {
    const userId = req.user._id;

    try {
        const post = new PostModel({
            ...req.body,
            author: userId,
        });

        const postSaved = await post.save();

        await UserModel.findOneAndUpdate(
          { _id: userId },
          { $push: { posts: postSaved._id } }
        );

        return res.status(201).json(postSaved);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const ctrlUpdatePost = async (req, res) => {
    const { id } = req.params
    const userId = req.user._id;

    const isPostAuthor = await isAuthor({ id, userId });

    if (!isPostAuthor) {
      return res.status(403).json({ error: 'User is not the post author' });
    }

    try {
        const post = await PostModel.findOne({
          _id: id,
          author: userId,
        });
    
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
    
        post.set(req.body);
    
        await post.save();
    
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const ctrlDeletePost = async (req, res) => {
    const { id } = req.params
    const userId = req.user._id;

    const isPostAuthor = await isAuthor({ id, userId });

    if (!isPostAuthor) {
      return res.status(403).json({ error: 'User is not the post author' });
    }

    try {
        const post = await PostModel.findOne({
          _id: id,
          author: userId,
        });
    
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        // Obtener todos los IDs de comentarios en el post
        const commentIds = post.comments;
    
        await CommentModel.deleteMany({ _id: { $in: commentIds } });

        // Eliminar referencias al post y comentarios en el modelo de usuario
        await UserModel.updateMany(
          { $or: [{ posts: id }, { comments: { $in: commentIds } }] },
          { $pull: { posts: id, comments: { $in: commentIds } } }
        );

        await PostModel.findOneAndDelete({
          _id: id,
          author: userId,
        });
    
        return res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

export const isAuthor = async ({ id, userId }) => {
    try {
      const post = await PostModel.findOne({
        _id: id,
        author: userId,
      });
  
      if (!post) {
        return false;
      }
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
};