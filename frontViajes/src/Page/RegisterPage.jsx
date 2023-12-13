import { useEffect, useRef, useState } from "react";
import { API_URL } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RegisterPage = () => {

    const { isAuthenticated } = useAuth()

    const [errorsRegister, setErrorsRegister] = useState(null)

    useEffect(() => {
        if (isAuthenticated) navigate('/posts')
      }, [isAuthenticated])

    useEffect(() => {
        if (errorsRegister){
            const timer = setTimeout(() => {
                setErrorsRegister(null)
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [errorsRegister])

    const ref = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const { avatar, email, username, password } = e.target.elements;

        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const avatarURL = formData.get("avatar");

        const user = {
            avatarURL,
            email,
            username,
            password,
        };

        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok){
            navigate("/login");
        } else {
            const data = await res.json();
            setErrorsRegister(data.errors.body)
        }

       
        // ref.current.reset();

    };



    

    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
          <form className="bg-subtle p-3 w-25 border border-dark rounded-4 bg-body-tertiary" onSubmit={handleSubmit} ref={ref}>
              <div class="mb-3">
                  <label htmlFor="username" class="form-label">Username<b className="text-danger">(*)</b></label>
                  <input type="text" class="form-control" id="username" name="username" aria-describedby="usernameHelp"/>
                  {
                    errorsRegister?.username && errorsRegister?.username.map(errorUsername => (
                        <div class="form-text">{errorUsername}</div>
                    ))
                  }
              </div>
              <div class="mb-3">
                  <label htmlFor="email" class="form-label">Email<b className="text-danger">(*)</b></label>
                  <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp"/>
                  {
                    errorsRegister?.email && errorsRegister?.email.map(errorEmail => (
                        <div class="form-text">{errorEmail}</div>
                    ))
                  }
                  {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
              </div>
              <div class="mb-3">
                  <label htmlFor="password" class="form-label">Password<b className="text-danger">(*)</b></label>
                  <input type="password" class="form-control" id="password" name="password"/>
                  {
                    errorsRegister?.password && errorsRegister?.password.map(errorPassword => (
                        <div class="form-text">{errorPassword}</div>
                    ))
                  }
              </div>
              <div class="mb-3">
                  <label htmlFor="avatar" class="form-label">Avatar</label>
                  <input type="text" class="form-control" id="avatar" name="avatar"/>
                  {
                    errorsRegister?.avatarURL && errorsRegister?.avatarURL.map(errorAvatar => (
                        <div class="form-text">{errorAvatar}</div>
                    ))
                  }
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary">REGISTER</button>
              </div>
          </form>
      </div>
    )
  }
  