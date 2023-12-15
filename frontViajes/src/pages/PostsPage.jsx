import styles from "../styles/PostsPage.module.css";

import { useAuth } from "../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, auth } = useAuth();

  const token = localStorage.getItem("token");

  const params = useParams()


  //console.log(posts);


  const getPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      console.log(data);
      setPosts(data)
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  const getComment = async (commentId) => {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`);
      const data = await response.json();
      //recupero el id del comentario que se encuentra seleccionado 
      console.log(commentId);
      return data;
    } catch (error) {
      console.error(error); 
    }
  }

  useEffect(() => {
    const loadComments = async () => {
      if (params.commentId) {
        const comment = await getComment(params.commentId)
        //en el comment trae un arreglo de los comentarios, si paso el indice me toma eso y no el seleccionado 
        console.log(comment[2].description);
        setNewComment( `${comment[0].description}`)
      } else {
        getPosts()
      }
    }
    loadComments()
  }, [newComment]);

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          description: newComment,
        }),
      });

      if (response.status !== 201) return alert("Error eliminated comment");

      setNewComment("")
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };


  const canEditDeletePost = (postAuthorId) => {
    // Verificar si el usuario autenticado es el autor
    return isAuthenticated && auth.id === postAuthorId;
  };

  const canEditDeleteComment = (postAuthorId, commentAuthorId) => {
    // Verificar si el usuario autenticado es el autor
    if (auth !== null){
      return isAuthenticated && auth.id === postAuthorId || auth.id === commentAuthorId;
    }
  };
  
  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": token
        }
      });

      if (response.status !== 200) return alert("Error eliminated post");

      alert("Post Eliminado");
      getPosts()
    } catch (error) {
      console.error(error);
    }
  }

  const deleteComment = async (id) => {
    try {
      const response = await fetch(`${API_URL}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": token
        }
      });

      if (response.status !== 200) return alert("Error eliminated comment");

      alert("Comment Eliminado");
      getPosts()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        {/* toda la carta */}
        <div className="postItem d-flex flex-column gap-3">
                    {
            loading ? (
              <h1>Loading....</h1>
            ) : (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div className="card" key={post._id}>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center text-left gap-2 comment-top p-2 bg-white">
                        <div className="profile-image">
                          <img
                            className="rounded-circle"
                            src={post.author.avatarURL}
                            width="70"
                          />
                        </div>
                        <div className="d-flex flex-column ml-3">
                          <div className="d-flex flex-column flex-row post-title">
                            <h5>{post.author.username}</h5>
                            <small className="text-body-secondary">
                              {post.createdAt}
                            </small>
                          </div>
                        </div>
                      </div>
                      <div>
                      {canEditDeletePost(post.author._id) && (
                          <div className="d-flex">
                            <Link className="btn m-1 btn-primary" to={`/new-post/${post._id}`}>Editar</Link>
                            <button className="btn m-1 btn-danger" onClick={() => deletePost(post._id)}>Eliminar</button>
                          </div>
                      )}
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.description}</p>
                      <div className="d-flex justify-content-center">
                        <img
                          src={post.imageURL}
                          className=""
                          width="750"
                          alt="..."
                        />
                      </div>
                      {isAuthenticated && (
                        <>
                          <form 
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleCommentSubmit(post._id);
                            }} 
                          className="d-flex flex-row add-comment-section gap-2 mt-4 mb-4">
                            <img
                              className="img-fluid img-responsive rounded-circle mr-2"
                              src={auth.avatar}
                              width="38"
                            />
                            <input
                              type="text"
                              className="form-control mr-3"
                              placeholder="Add comment"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button className="btn btn-primary" type="submit">
                              Comment
                            </button>
                          </form>
                        </>
                      )}
                      {/* comments */}
                      <div className="coment-bottom bg-white px-4 overflow-y-scroll">
                        {post.comments.length > 0 &&
                          post.comments.map((comment) => (
                            <div
                              className="commented-section my-3 d-flex justify-content-between"
                              key={comment._id}
                            >
                              <div>
                                <div className="d-flex flex-row gap-2 align-items-center commented-user">
                                  <img
                                    className="img-fluid img-responsive rounded-circle mr-2"
                                    src={comment.author.avatarURL}
                                    width="50"
                                  />
                                  <div className="d-flex flex-column justify-content-center">
                                    <h5 className="fs-6">
                                      {comment.author.username}
                                    </h5>
                                    <span className="fs-6">{comment.createdAt}</span>
                                  </div>
                                </div>
                                <div className="comment-text-sm">
                                  <span>{comment.description}</span>
                                </div>
                              </div>
                              <div>
                                {canEditDeleteComment(post.author._id, comment.author._id) && (
                                  <div className="d-flex">
                                    <Link className="btn m-1 btn-primary" to={`/posts/${comment._id}`}>Editar</Link>
                                    <button className="btn m-1 btn-danger" onClick={() => deleteComment(comment._id)}>Eliminar</button>
                                  </div>
                                )}
                              </div>
                              
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-center">
                  <h1>No hay posts disponibles...</h1>
                </div>
              )
            )
          }
          
        </div>
      </div>
    </>
  );
};