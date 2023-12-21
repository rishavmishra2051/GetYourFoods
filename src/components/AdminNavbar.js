import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/admin">GetYourFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/admin">Admin</Link>  {/* index.css - nav-link color white */}
                            </li>
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-warning mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-warning mx-1" to="/signup">Signup</Link>
                            </form> :
                            <div>
                                <button onClick={handleLogout} className="btn bg-white text-warning" >Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
