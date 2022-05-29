import React, {Fragment, useEffect, useState} from 'react';
import {TextField} from "../../src/components/inputs";
import PageTitle_ from "../../src/components/PageTitle";
import {Button} from "react-bootstrap";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {FincaTableDetails} from "./TableDetails";
import swal from "sweetalert";
import {Notifications} from "../../src/components/Notifications/Notifications";
import {useDispatch, useSelector} from "react-redux";
import {deactivateFinca, loadFinca, saveFinca} from "../../src/redux/action/general";




const Finca = () => {

    const dispatch = useDispatch()
    const dataState = useSelector((state) => state.general.dataSuccess)//espera cambios en dataSuccess
    const finca = useSelector((state) => state.general.finca)//espera cambios en dataSuccess
    const loadingState = useSelector((state) => state.loading.loading)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        dispatch(loadFinca())
    }, [dataState])

    useEffect(() => {
        loadingState ? setLoading(true) : setLoading(false)
    }, [loadingState])

    const validate = Yup.object({
        nombre: Yup.string().max(255, 'Debe de tener hasta 255 caracteres o menos').required('No puede estar vacío'),
        descripcion: Yup.string().max(300, 'Debe de tener hasta 300 caracteres o menos')
    })

    const onSubmit =  (data, resetForm)  => {
        const {nombre, descripcion, id} = data
        dispatch(saveFinca(nombre, descripcion, id, resetForm))

    }

    const deleteFinca = (id, nombre) => {
        swal({
            title: `Seguro que desea desactivar ${nombre} ?`,
            text: "Una vez desactivados no se mostrará en otros formularios!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deactivateFinca(id))
            } else {
                swal("A cancelado la desactivacion!");
            }
        })

    }

    return (
        <div>
            <Formik
                initialValues={{
                    id:'',
                    nombre: '',
                    descripcion: '',
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
                            <PageTitle_ active="Finca" mother="General" customText={"Control de Fincas"}/>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Finca</h4>
                                            < Notifications/>
                                        </div>

                                        <div className="card-body">
                                            <div className="basic-form">
                                                <Form>
                                                    <div className="form-row">

                                                        <TextField label={'Nombre'} name={'nombre'} type={'text'}
                                                                   inputsize={"col-md-12"}/>
                                                        <TextField label={'Descripcion'} name={'descripcion'}
                                                                   type={'textarea'} inputsize={"col-md-12"}/>
                                                    </div>
                                                    <div className={'form-row'}>
                                                        <div className={'form-group col-sm-4'}>
                                                            <Button variant="primary mr-2"
                                                                    disabled={!(isValid && dirty && !loading)}
                                                                    type={"submit"}>{loading ? 'Guardando ...' : 'Guardar'}

                                                            </Button>
                                                            <Button variant="secondary" type={'reset'} onClick={() => {

                                                            }
                                                            }>Reset</Button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12">
                                    <div className="table-responsive">
                                        <FincaTableDetails valores={setFieldValue} details={finca ? finca : ''}
                                                      deleteFinca={deleteFinca}/>
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

export default Finca;