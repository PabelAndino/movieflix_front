import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {Formik, Form} from "formik";
import {SelectFormik, TextField} from "../../src/components/inputs";
import * as Yup from "yup";



const CuracionEntradaModal = ({basicModal, setBasicModal, setTableDetails, optionsClase,optionsCorte, name}) => {
    const validate = Yup.object({
        //pilon : Yup.string().max(4,"Debe de contener hasta 4 numeros").required('required'),
        clase: Yup.string().required('Seleccione un pilon'),
        corte: Yup.string().required('Seleccione un pilon'),
        libras: Yup.string().test(
            "maxDigitsAfterDecimal",
            "Debe tener 2 decimales o menos",//Debe tener 2 decimales o menos
            (libras) => Number.isInteger(libras * (10 ** 2))
        ).required("No admite vacío"),
    })

    /*Olnly Numbers*/
    const onKPress = (e) => {
        !/[0-9]/.test(e.key) && e.preventDefault()
    }

    return (
        <div>
            <Formik initialValues={{
                libras: '',
                clase: '',
                corte: ''
            }}
                    validationSchema={validate}
                    onSubmit={values => {
                        setTableDetails(values, false)
                    }}

            >
                {
                    formik => (

                        <Modal className="fade" size={'lg'} show={basicModal}>

                            <Modal.Header>
                                <Modal.Title>Detalles del bulto</Modal.Title>
                                <Button
                                    variant=""
                                    className="close"
                                    onClick={() => setBasicModal(false)}
                                ><span>&times;</span></Button>
                            </Modal.Header>
                            <Form>
                                <Modal.Body>

                                    <div className={'form-row'}>
                                        <TextField label={"Libras"} name={"libras"} type={"text"} onKeyPress={onKPress}
                                                   inputsize={"col-md-2"}/>
                                        <SelectFormik options={optionsClase} value={formik.values.clase} onChange={value=>formik.setFieldValue('clase',value.value)}  name={'clase'} inputsize={'col-md-4'} label={'Clase'} />
                                        <SelectFormik options={optionsCorte} value={formik.values.corte} onChange={value=>formik.setFieldValue('corte',value.value)}  name={'corte'} inputsize={'col-md-4'} label={'Corte'} />
                                    </div>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" disabled={!(formik.isValid && formik.dirty)}
                                            type={"submit"}>Agregar</Button>{/*if you want the submit button to be disabled until all the fields are valid and if the fields values have been changed from their initial values then you would have to use both of the above attributes in conjunction as below:*/}
                                    <Button className="mr-2" type='reset' variant="warning">
                                        Reset
                                    </Button>
                                </Modal.Footer>
                            </Form>

                        </Modal>

                    )
                }

            </Formik>
        </div>
    );
};

export default CuracionEntradaModal;