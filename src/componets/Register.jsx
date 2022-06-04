import React from 'react'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom';

const Register = (props) => {

    //Categoría principal	
    const principalCategory = [{ value: 0, type: 'Selecione una categoría' }, { value: 1, type: 'Mantenimiento Inmuebles' },
    { value: 2, type: 'Mantenimiento Muebles' }, { value: 3, type: 'Servicios' }]

    //SubCategorias 
    const propertyMaintenance = [{ value: 0, type: 'Selecione una categoría' }, { value: 1, type: 'Baños' }, { value: 2, type: 'Cielo Raso' },
    { value: 3, type: 'Eléctrico' }, { value: 4, type: 'Pared' }, { value: 5, type: 'Puerta' }];

    const furnitureMaintenance = [{ value: 0, type: 'Selecione una categoría' }, { value: 1, type: 'Aire Acondicionado' }, { value: 2, type: 'Archivador' },
    { value: 3, type: 'Puesto de trabajo' }, { value: 4, type: 'Silla' }];

    const service = [{ value: 0, type: 'Selecione una categoría' }, { value: 1, type: 'Aseo' }, { value: 2, type: 'Transportes' }, { value: 3, type: 'Vigilancia' }];




    //hooks
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    const [principalCategorySelect, setPrincipalCategorySelect] = React.useState(0);
    const [secundaryCategorySelect, setSecundaryCategoriSelect] = React.useState(0)


    const [lista, setLista] = React.useState([]);
    const [secundaryList, setSecundaryList] = React.useState([]);
    const [date, setDate] = React.useState('')
    const [place, setPlace] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [error, setError] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)

    //guardar datos
    const guardarDatos = async (e) => {
        e.preventDefault()


        try {
            let category = principalCategory[principalCategorySelect];
            let subCategory = secundaryList[secundaryCategorySelect];
            console.log(category);
            console.log(subCategory);



            const nuevoUsuario = {
                category, subCategory, date, place, description
            }
            const dato = await db.collection(props.user.email).add(nuevoUsuario)

            setLista([
                ...lista,
                { ...nuevoUsuario, id: dato.id }
            ])

        } catch (error) {
            console.log(error)
        }
        setPrincipalCategorySelect('')
        setError(null)
    }

    const getSelectedPrincipal = (e) => {
        let index = indexS(e);
        setPrincipalCategorySelect(index);
        getSecundary(index);
    }

    const getSelectedSecond = (e) => {
        let index = indexS(e);
        setSecundaryCategoriSelect(index);

    }

    function indexS(e) {
        return e.target.value;
    }

    function getSecundary(indexValue) {

        if (indexValue == 1) {
            setSecundaryList(propertyMaintenance);
        }

        if (indexValue == 2) {
            setSecundaryList(furnitureMaintenance);
        }

        if (indexValue == 3) {
            setSecundaryList(service);
        }
    }



    return (
        <div className="  rounded requirements-container">

            <div className="requirements-container-form">
                <div className="row justify-content-center">
                    <div className=" margin-top form-container-card col col-12 col-sm-10 col-md-6 col-xl-4">
                        <br />
                        <br />
                        <br />
                        {
                            modoEdicion ? (

                                <h3 className="margin-top text-center ">Editar Solicitud</h3>

                            ) : (<h3 className="margin-top text-center ">Solicitud</h3>)
                        }
                        <br />
                        {
                            error ? (
                                <div className='alert alert-danger'>
                                    {error}
                                </div>
                            ) : null
                        }

                        <form className='information-f' onSubmit={guardarDatos}>

                            <label>Categoría Principal</label>

                            <select onChange={e => getSelectedPrincipal(e)} value={principalCategorySelect} name='category' id="principalCategory" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                {
                                    principalCategory.map((element, index) =>
                                        <option value={index} id={element.value} key={index}>{element.type}</option>
                                    )
                                }
                            </select>

                            <label>Sub-Categoría</label>

                            {
                                principalCategorySelect != 0 ? (

                                    <select value={secundaryCategorySelect} name='subCategory' onChange={e => getSelectedSecond(e)} id="secundaryCategory" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                        {
                                            secundaryList.map((element, index) =>
                                                <option value={index} id={element.value} key={index}>{element.type}</option>
                                            )
                                        }
                                    </select>
                                ) : <select id="secundaryCategory" className="form-select form-select-lg mb-3" disabled> </select>
                            }

                            <div className="form-group">
                                <label >Descripcion de solicitud</label>
                                <textarea className="form-control"
                                    id="description"
                                    name='description'
                                    rows="3"
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                />
                            </div>

                            <div>
                                <label>Ubicación dentro de la empresa</label>
                                <input type="text"
                                    className='form-control mb-3'
                                    name='place'
                                    onChange={e => setPlace(e.target.value)}
                                    value={place}
                                />
                            </div>

                            <div>
                                <label>Fecha de solicitud</label>
                                <input type="date"
                                    className='form-control mb-3'
                                    name='date'
                                    onChange={e => setDate(e.target.value)}
                                    value={date}
                                />
                            </div>
                            <div className=".border-radius d-grid gap-2">
                                <button className='btn btn-success ' type='submit'>Guardar</button>
                            </div>
                        </form>
                        <div className="margin-bottom margin-top d-grid gap-2 border-right ">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register