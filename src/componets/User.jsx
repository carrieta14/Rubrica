
import { auth } from '../firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import React from 'react';

const User = () => {

  const navigate= useNavigate()
  const [user, setUser]=React.useState(null)

  //Obtener información del usuario logeado
  React.useEffect(() => {

    if (auth.currentUser) {
      setUser(auth.currentUser)
    } else {

      Swal.fire({
        icon: 'error',
        title: 'Error de usuario',
        text: 'Debes iniciar sesión	para ingresar a las solicitudes.'
      })
      console.log('Error')
      navigate('/login') 
    }
  }, [navigate])
  return (

    <div className="  rounded requirements-container">

      <Register user={user}/>

    </div>

  )
}

export default User