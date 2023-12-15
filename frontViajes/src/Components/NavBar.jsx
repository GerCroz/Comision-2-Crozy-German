import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, auth, logout } = useAuth();

  

  return (
    <>
      <header className="navitem p-2 border-bottom">
        <div className="container-flex">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            />

            {isAuthenticated ? (
              <>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li>
                    <Link
                      to="/"
                      className="nav-link px-2 link-secondary disabled"
                    >
                      VIAJES-APP
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link px-2 link-body-emphasis">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posts"
                      className="nav-link px-2 link-body-emphasis"
                    >
                      Posteos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/new-post"
                      className="nav-link px-2 link-body-emphasis"
                    >
                      Nuevo Posteo
                    </Link>
                  </li>
                  {/* <li><a href="#" className="nav-link px-2 link-body-emphasis">Products</a></li> */}
                </ul>

                <div className="dropdown text-end">
                  <a
                    href="#"
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={auth.avatar}
                      alt={auth.username}
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  </a>
                  <ul className="dropdown-menu text-small">
                    <li>
                      <a className="dropdown-item disabled" href="#">
                        {auth.username}
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/" onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li>
                    <Link
                      to="/"
                      className="nav-link px-2 link-secondary disabled"
                    >
                      VIAJES-APP
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link px-2 link-body-emphasis">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posts"
                      className="nav-link px-2 link-body-emphasis"
                    >
                      Posteos
                    </Link>
                  </li>
                </ul>
                <div className="m-2 d-flex gap-2">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};