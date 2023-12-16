import { Link } from "react-router-dom"

export const Homepage = () => {
  return (
    <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="px-4 py-5 my-5 text-center">
                <img className="d-block mx-auto mb-4" src="https://th.bing.com/th/id/R.f1c6375a73761be5d0638667c166da04?rik=ZmG1C93i1hEoxA&pid=ImgRaw&r=0" alt="" width="72"/>
                <h1 className="display-5 fw-bold text-body-emphasis">¡Bienvenid@ a Viajes App!</h1>
                <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">Descubre el mundo a través de las experiencias de viajeros apasionados. En nuestro blog, no solo compartimos destinos, sino también las historias que los hacen inolvidables. Desde Aventuras épicas hasta rinciones secretos, Viajes APP es tu guía personal para explorar el planeta</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to="/posts" className="btn btn-primary btn-lg px-4 gap-3">Ver todos los posteos</Link>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}



