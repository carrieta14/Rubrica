import React from 'react'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [modoRegistro, setModoRegistro] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(null)
    const navigate=useNavigate()

    //guardar datos

    const guardarDatos = (e) => {
        e.preventDefault()
        if (!email.trim()) {
            setError('Introducir email')
            return
        }
        if (!password.trim()) {
            setError('Introducir contraseña')
            return
        }
        if (password.length < 8) {
            setError('La contraseña debe contener 8 caracteres minimo')
        }
        setError(null)

        if (modoRegistro) {
            registrar()
        }else{
            login()
        }
        console.log(auth.currentUser)
    }

    const registrar = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)

            await db.collection('usuariosdb').doc(res.user.email).set(
                {
                    email: res.user.email,
                    id: res.user.uid
                }
            )
            setEmail('')
            setPassword('')
            setError('')
            navigate('/user')

            

        } catch (error) {
            console.log(error)
           if(error.code === 'auth/invalid-email'){
            setError('Email invalido')
           }
           if(error.code === 'auth/email-already-in-use'){
            setError('Email en uso')
           }
        }
    }, [email, password])


    const login=React.useCallback(async () => {
        try {
            const res= await auth.signInWithEmailAndPassword(email, password)
            console.log(res.user)
            setEmail('')
            setPassword('')
            setError('')

            navigate('/user')

    
        } catch (error) {
            console.log(error)
            if (error.code == 'auth/invalid-email') {
                setError({ existError: true, type: 'Email no valido' });
              }
        
              if (error.code == 'auth/user-not-found') {
                setError('Correo no registrado');
              }
        
              if (error.code == 'auth/wrong-password') {
                setError('Correo/Contraseña invalidos');
        
              }
        }

    })

    return (
        <div className='container'>
            <br />
            <br />
            <h3 className='text-center' >
                {
                    modoRegistro ? 'Registro de usuario' : 'Login'
                }
            </h3>
            <div className='row justify-content-center'>
                <div className='col-12 col-sm-10 col-md-6 col-xl-4'>
                    <br />
                    <br />
                    <form onSubmit={guardarDatos}>
                        {
                            error ? (
                                <div className='alert alert-danger'>{error}</div>
                            ) : null
                        }
                        <input type="email"
                            className='form-control mb-3'
                            placeholder='Email'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input type="password"
                            className='form-control mb-3'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div class="d-grid gap-2">
                            <button className='btn btn-dark'>
                                {
                                    modoRegistro ? 'Registrarse' : 'Login'
                                }
                            </button>
                            <button className='btn btn-dark' type='button' onClick={() => { setModoRegistro(!modoRegistro) }}>
                                {
                                    modoRegistro ? 'Ya estas registrado?' : 'Aún no tienes cuenta?'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login