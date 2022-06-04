import React from 'react'
import { db } from '../firebase'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'


const Consultar = (props) => {

    const [lista, setLista] = React.useState([])
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const navigate= useNavigate()
    const [user, setUser] = React.useState('')

    React.useEffect(() => {

        if (auth.currentUser) {
            setUser(auth.currentUser);
        } else {
            navigate('/login')
            console.log('Error')
        }
        

        const obtenerDatos = async () => {
            try {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                console.log(props.user.email);
                const data = await db.collection(props.user.email).get()
                const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                console.log(arrayData);
                setLista(arrayData)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
        
    }, [])
    return (
        <div>
            <div className="requirements-container-list">
                <h3 className=" text-center ">Registro de solicitudes</h3>
                <hr />
                <div className="row justify-content-center">

                    <div className="col col-12 col-sm-12">

                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">id</th>
                                    <th scope="col">Categoría Principal</th>
                                    <th scope="col">Sub-Categoría</th>
                                    <th scope="col">Descripcion de solicitud</th>
                                    <th scope="col">Ubicación dentro de la empresa</th>
                                    <th scope="col">Fecha de solicitud</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>

                                {lista.map((element, index) =>
                                    <tr key={index}>

                                        <td scope="row"><b>{index + 1}</b></td>
                                        <td>{element.id}</td>
                                        <td>{element.category}</td>
                                        <td>{element.subCategory}</td>
                                        <td>{element.description}</td>
                                        <td>{element.place}</td>
                                        <td>{element.date}</td>

                                        <td><button type="button" className="btn btn-primary" >Editar</button></td>
                                        <td><button type="button" className="btn btn-danger"  >Borrar</button></td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Consultar