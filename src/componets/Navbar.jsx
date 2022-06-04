import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = (props) => {
    const navigate = useNavigate()

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                navigate('/login')
            })
    }

    return (
        <div className='navbar navbar-dark bg-dark'>
            <Link className='navbar-brand' to="/">Logo</Link>
            <div>
                <div className='d-flex'>
                    <Link to="/" className='btn btn-dark mr-3'>Inicio</Link>
                    {
                        props.firebaseUser !== null ? (
                            <Link to="/user" className='btn btn-dark mr-3'>Perfil</Link>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                            <button className='btn btn-dark mr-3' onClick={() => cerrarSesion()}>
                                Cerrar Sesión
                            </button>
                        ) : (<Link to="/login" className='btn btn-dark '>Login</Link>)
                    }
                    {
                        props.firebaseUser !== null ? (
                            <Link to="/consultar" className='btn btn-dark mr-3'>Consultar</Link>
                        ) : null
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar
