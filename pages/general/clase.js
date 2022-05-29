import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    claseLoad,
    deactivatePilon,
    desactivateClase,
    loadPilon,
    saveClase,
    savePilon
} from "../../src/redux/action/general";
import * as Yup from "yup";
import swal from "sweetalert";
import {Form, Formik} from "formik";
import PageTitle_ from "../../src/components/PageTitle";
import {Notifications} from "../../src/components/Notifications/Notifications";
import {TextField} from "../../src/components/inputs";
import {Button} from "react-bootstrap";
import {ClaseTableDetails, PilonTableDetails} from "./TableDetails";

const Clase = () => {
    const dispatch = useDispatch()
    const dataState = useSelector((state) => state.general.dataSuccess)//espera cambios en dataSuccess
    const loadingState = useSelector((state) => state.loading.loading)
    const [loading, setLoading] = useState(true)
    const clase = useSelector((state)=>state.general.clase)
    useEffect(() => {
        loadingState ? setLoading(true) : setLoading(false)
    }, [loadingState])

    useEffect(()=>{
        dispatch(claseLoad())
    },[dataState])

    const validate = Yup.object({
        nombre: Yup.string().max(50, 'Debe de tener hasta 50 caracteres o menos').required('No puede estar vacío'),

    })

    const deleteClase = (id, nombre) =>{
        swal({
            title: `Seguro que desea desactivar el pilón ${nombre} ?`,
            text: "Una vez desactivado no se mostrará en otros formularios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(desactivateClase(id))
            } else {
                swal("A cancelado la desactivacion!");
            }
        })
    }

    const onSubmit = (data, resetForm) =>{
        const {nombre, estado, id} = data
        dispatch(saveClase(nombre, id, resetForm))
    }


    return (
        <div>
            <Formik
                initialValues={{
                    id:'',
                    nombre: '',
                    estado: true,
                }}
                validationSchema={validate}
                onSubmit={ (values,{resetForm}) => {
                    onSubmit(values, resetForm)
                }}
            >
                {
                    ({isValid, dirty, values, setFieldValue}) => (
                        <Fragment>
                            <PageTitle_ active="Clase" mother="General" customText={"Control de Clases"}/>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Clase</h4>
                                            < Notifications/>
                                        </div>

                                        <div className="card-body">
                                            <div className="basic-form">
                                                <Form>
                                                    <div className="form-row">

                                                        <TextField label={'Nombre'} name={'nombre'} type={'text'}
                                                                   inputsize={"col-md-12"}/>

                                                    </div>
                                                    <div className={'form-row'}>
                                                        <div className={'form-group col-sm-4'}>
                                                            <Button variant="primary mr-2"
                                                                    disabled={!(isValid && dirty && !loading)}
                                                                    type={"submit"}>{loading ? 'Guardando ...' : 'Guardar'}

                                                            </Button>
                                                            <Button variant="secondary" type={'reset'} >Reset</Button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12">
                                    <div className="table-responsive">
                                        <ClaseTableDetails valores={setFieldValue} details={clase ? clase : ''}
                                                           deleteClase={deleteClase}/>
                                    </div>
                                </div>

                            </div>
                        </Fragment>
                    )
                }
            </Formik>
        </div>
    );
};

export default Clase;