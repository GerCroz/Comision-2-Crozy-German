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
//trae los comentarios
  commentRouter.get("/comments", crtlGetComments);
//comentaio por id de comentario
  commentRouter.get("/comments/:commentId", crtlGetComment);

  commentRouter.get("/comments-post/:postId", crtlGetCommentsPost);

  //crea un comentario para un post determinado
  commentRouter.post(
    "/comments/:postId",
    authHeader,
    validateToken,
    //createCommentValidation,
    crtlCreateComment
  );

  //actualizar el comentario por Id de comentario
  commentRouter.put(
    "/comments/:commentId",
    authHeader,
    validateToken,
    updateCommentValidation,
    crtlUpdateComment
  );
// elimina un comentario por Id de comentario
  commentRouter.delete("/comment/:commentId", authHeader, validateToken, deleteCommentValidation, ctrlDeleteComment)