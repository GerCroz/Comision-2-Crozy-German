import { Router } from "express";
import { 
    ctrlCreatePost,
    ctrlGetPost,
    ctrlUpdatePost,
    ctrlDeletePost,
    ctrlGetPosts,
 } from "../controllers/post.controllers.js";
import { 
    createPostValidation,
    deletePostValidation,
    updatePostValidation,
  } from "../models/validations/post.validation.js";
import { authHeader } from "../models/validations/auth.validation.js";
import { validateToken } from "../middlewares/validate-token.js";

export const postRouter = Router();

postRouter.get("/posts", ctrlGetPosts);

postRouter.get("/posts/:id", ctrlGetPost);

postRouter.post(
    "/posts",
    validateToken,
    ctrlCreatePost,
);

postRouter.put(
    "/posts/:id",
    authHeader,
    validateToken,
    updatePostValidation,
    ctrlUpdatePost,
);

postRouter.delete(
    "/posts/:id",
    authHeader,
    validateToken,
    deletePostValidation,
    ctrlDeletePost
);