import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { useEffect, useId, useRef, useState } from "react";

export const FormPage = () => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    imageURL: ''
  })

  const token = localStorage.getItem("token");
  
  const { title, description, imageURL } = formState;

  const navigate = useNavigate();

  const params = useParams()

  const onInputChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [ name ] : value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (params.id) {
      updatePost(params.id, formState)
    } else {
      createPost(formState)
    }
    navigate('/posts') 
  }

  const getPost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error); 
    }
  }

  const createPost = async (data) => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error(error); 
    }
  }

  const updatePost = async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error(error); 
    }
  }

   useEffect(() => {
    const loadPosts = async () => {
      if (params.id) {
        const post = await getPost(params.id)
        setFormState({
          title: `${post.title}`,
          description: `${post.description}`,
          imageURL: `${post.imageURL}`
        })
      }
    }
    loadPosts()
  }, [])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form
          className="d-flex flex-column p-10 rounded-4"
          onSubmit={handleSubmit}
        >
          <h1 className="my-2">Formulario</h1>
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full bg-zinc-700 text-black p-2 rounded-md my-2"
            value={title}
            onChange={onInputChange}
            autoFocus
          />

          <label htmlFor="description">Descripcion</label>
          <textarea
            rows="10"
            name="description"
            placeholder="Description"
            className="w-full bg-zinc-700 text-black p-2 rounded-md my-2"
            value={description}
            onChange={onInputChange}
          ></textarea>

          <label htmlFor="imageURL">Imagen URL</label>
          <input
            type="url"
            name="imageURL"
            className="w-full bg-zinc-700 text-black p-2 rounded-md my-2"
            value={imageURL}
            onChange={onInputChange}
            required
          />

          <button className="btn bg-success text-white">Publicar</button>
        </form>
      </div>
      ;
    </>
  );
};