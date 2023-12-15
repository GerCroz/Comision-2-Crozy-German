import { useNavigate } from "react-router-dom";
import { useEffect, useId, useRef } from "react";
import { API_URL } from "../utils/consts";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {

  const { isAuthenticated } = useAuth()

  const ref = useRef(null);

  const emailRef = useId();
  const passwordRef = useId();

  const { signin } = useAuth()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const user = {
      email,
      password,
    };

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // console.log(res)

    if (res.status !== 200) {
      // res.current.reset();
      return alert("Error al iniciar sesión");
    }

    const data = await res.json();


    signin(data);

    // ref.current.reset();

    navigate("/posts");
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/posts')
  }, [isAuthenticated])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} ref={ref} className="p-3 w-25 border border-dark rounded-4 bg-body-tertiary">
            <div className="mb-3 mt-4">
                <label htmlFor={emailRef} className="form-label">Email<b className="text-danger">(*)</b></label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  id={emailRef} 
                  aria-describedby="emailHelp"/>
                {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
                <label htmlFor={passwordRef} className="form-label">Password<b className="text-danger">(*)</b></label>
                <input 
                  type="password"
                  name="password"
                  className="form-control" 
                  id={passwordRef}
                />
            </div>
            <div className="d-flex justify-content-center mb-4">
              <button type="submit" className="btn btn-primary">SIGN IN</button>
            </div>
        </form>
    </div>
  )
}