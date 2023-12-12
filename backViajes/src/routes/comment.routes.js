import { Router } from "express";
import { authHeader } from "../models/validations/auth.validation.js";
import { validateToken } from "../middlewares/validate-token.js";
import { 
    crtlCreateComment,
    ctrlDeleteComment,
    crtlGetComment,
    crtlGetComments,
    crtlGetCommentsPost,
    crtlUpdateComment,
 } from "../controllers/comment.controllers.js";
 import { 
    createCommentValidation,
    deleteCommentValidation,
    updateCommentValidation,
  } from "../models/validations/comment.validation.js";

  export const commentRouter = Router();

  commentRouter.get("/comments", crtlGetComments);

  commentRouter.get("/comments/:commentId", crtlGetComment);

  commentRouter.get("/comments-post/:postId", crtlGetCommentsPost);

  commentRouter.post(
    "/comments/:postId",
    authHeader,
    validateToken,
    createCommentValidation,
    crtlCreateComment
  );

  commentRouter.put(
    "/comments/:commentId",
    authHeader,
    validateToken,
    updateCommentValidation,
    crtlUpdateComment
  );

  commentRouter.delete(
    "comment/:commentId",
    authHeader,
    validateToken,
    deleteCommentValidation,
    ctrlDeleteComment
  );