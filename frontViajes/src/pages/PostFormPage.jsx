import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { useEffect, useId, useRef, useState } from "react";

export const PostFormPage = () => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    imageURL: ''
  })

  const token = localStorage.getItem("token");
  
  const { title, description, imageURL } = formState;

  const [errorsPost, setErrorsPost] = useState(null)

  const navigate = useNavigate();

  const params = useParams()

  const onInputChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [ name ] : value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      if (params.id) {
      updatePost(params.id, formState)
    } else {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(formState)
      });

      const data = await response.json()
      console.log(data)
      if(response.ok){
        navigate('/posts')
      } else {
        const data = await response.json()
        setErrorsPost(data.errors.body)
      }
    }
    } catch (error) {
      console.log(error, 'error handle')
    }
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

      return response;
    } catch (error) {
      console.log(error); 
    }
  }

  const updatePost = async (id, data) => {
    try {
      console.log(data);
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

  useEffect(() => {
    if (errorsPost){
        const timer = setTimeout(() => {
          setErrorsPost(null)
        }, 2500)
        return () => clearTimeout(timer)
    }
}, [errorsPost])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form
          className="d-flex flex-column p-10 rounded-4"
          onSubmit={handleSubmit}
        >
          <h1 className="my-2">Nuevo Post</h1>
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
           {
            errorsPost?.title && <div class="form-text" id="basic-addon4">{errorsPost.title}</div>
          }

          <label htmlFor="description">Descripcion</label>
          <textarea
            rows="10"
            name="description"
            placeholder="Description"
            className="w-full bg-zinc-700 text-black p-2 rounded-md my-2"
            value={description}
            onChange={onInputChange}
          ></textarea>
          {
            errorsPost?.description && 
            errorsPost?.description.map((errorImage, index) => (
              <div className="form-text" key={index}>{errorImage}</div>
            ))
          }

          <label htmlFor="imageURL">Imagen URL</label>
          <input
            type="url"
            name="imageURL"
            className="w-full bg-zinc-700 text-black p-2 rounded-md my-2"
            value={imageURL}
            onChange={onInputChange}
          />
          {
            errorsPost?.imageURL && 
            errorsPost?.imageURL.map(errorImage => (
              <div class="form-text" id="basic-addon4">{errorImage}</div>
            ))
          }

          <button className="btn bg-success text-white">Publicar</button>
        </form>
      </div>
      ;
    </>
  );
};