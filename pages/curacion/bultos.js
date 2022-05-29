import React, {Fragment, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {pageTitle} from "../../src/redux/action/utils";
import PageTitle_ from "../../src/components/PageTitle";
import {Button} from "react-bootstrap";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {CuracionTable, CuracionTableUpdate} from "./curacionTable";
import CuracionEntradaModal from "./curacionEntradaModal";
import {claseLoad, corteLoad, loadFinca, loadPilon} from "../../src/redux/action/general";
import {loadBultos, saveBulto, saveBultoEdit} from "../../src/redux/action/curacion";
import {Notifications} from "../../src/components/Notifications/Notifications";
import {Form, Formik} from "formik";
import {SelectFormik, TextField} from "../../src/components/inputs";
import CuracionListTable from "./curacionListTable";
import * as Yup from "yup";
import {simpleNotification} from "../../src/redux/action/simpleNotification";
import lodash from "lodash";


const Bultos = () => {

    const dispatch = useDispatch()
    const fincas = useSelector((state) => state.general.finca)
    const pilones = useSelector((state) => state.general.pilon)
    const bultos = useSelector((state) => state.bultos.bultos)
    const clases = useSelector((state) => state.general.clase)
    const cortes = useSelector((state) => state.general.corte)
    const update_status = useSelector((state) => state.update_status.update)
    const success_action = useSelector((state) => state.bultos.action_bultos_success)
    const [bultosState, setBultosState] = useState([])


    useEffect(() => {
        dispatch(loadFinca())
        dispatch(loadBultos())
        dispatch(loadPilon())
        dispatch(claseLoad())
        dispatch(corteLoad())

        if (success_action) {
            setDetailToTable([])
            setDetailToTableEdit([])
        }
    }, [success_action])


    const validate = Yup.object({
        finca: Yup.string().required('Seleccione una Finca'),
    })

    const [selectedDate, handleDateChange] = useState(new Date());
    //const fecha = selectedDate.toLocaleDateString() //    9/16/2021
    //el useState de company que cambiara segun el onchange del picker

    //las opciones por defecto que cuando haga el onchange le pasara al useState y que no tiene datos
    const optionsNoData = [
        {value: null, label: "No data"},
    ];
    const optionsNoDataPilon = [{value: null, label: "No hay datos"},]
    const optionsNoDataClase = [{value: null, label: "No hay datos"},]
    const optionsNoDataCorte = [{value: null, label: "No hay datos"},]

    //las opciones por defecto que cuando haga el onchange le pasara al useState
    const optionFincas = fincas ? (fincas.map((i) => {
        return {
            value: i.id,
            label: `${i.nombre} ${i.descripcion} `
        }
    })) : optionsNoData
    const optionPilon2 = pilones ? (pilones.map((i) => {
        return {
            value: i.id,
            label: `${i.nombre}`,
            isDisabled: false
        }

    })) : optionsNoDataPilon
    const optionPilon3 = pilones ? (pilones.map((i) => {
        if (bultos !== null && pilones !== null) {
            (pilones.map((i) => {
                bultos.map((bulto) => {
                    if ((bulto.pilon.id) === i.id) {
                        return {
                            value: i.id,
                            label: `${i.nombre}`,
                            isDisabled: true
                        }
                    } else {
                        return {
                            value: i.id,
                            label: `${i.nombre}`,
                            isDisabled: false
                        }
                    }
                })
            }))


        }


    })) : optionsNoDataPilon


    const optionBultoTmp = bultos ? (bultos.map((i) =>{
        return {
            value: i.pilon.id,
            label: `${i.nombre}`,
            isDisabled: true
        }
    })) : optionsNoDataPilon

    const optionPilonTmp = pilones ? (pilones.map((i) => {
        return {
            value: i.id,
            label: `${i.nombre}`,
            isDisabled: false
        }

    })) : optionsNoDataPilon


    const optionPilon = optionPilonTmp.filter( (o1) => {
        return !optionBultoTmp.some( (o2) => {
            return o1.value === o2.value; // return the ones with equal id

        })
    })

    //Este devuelve el que esta ya el pilon que ya esta en el bultos
    const optionPilon5 =  optionPilonTmp.filter( (o1) =>{
        return optionBultoTmp.some( (o2) => {
            return o1.value === o2.value; // return the ones with equal id

        })
    })

    //devolvera repetidas veces los resultados por cada fila
    /*const tmppilon = []
    const optionPilon4 = bultos ? (bultos.forEach(data => {
        const {id, nombre, pilon} = data
        pilones ? (pilones.map((i) => {
            if ((i.id) === (pilon.id)) {
                tmppilon.push({
                    value: i.id,
                    label: `${i.nombre}`,
                    isDisabled: false
                })

            } else {
                tmppilon.push({
                    value: i.id,
                    label: `${i.nombre}`,
                    isDisabled: true
                })
            }

        })) : ''




    })) : optionsNoData*/



    const optionClase = clases ? (clases.map((i) => {
        return {
            value: i.id,
            label: `${i.nombre}`
        }
    })) : optionsNoDataClase
    const optionCorte = cortes ? (cortes.map((i) => {
        return {
            value: i.id,
            label: `${i.nombre}`
        }
    })) : optionsNoDataCorte

    const updateWarningClass = update_status ? ('bg-warning') : ''


    //Obtiene la fecha en formato sql
    const printDate = () => {
        const day = selectedDate.getDate()
        const month = (selectedDate.getMonth()) + 1 //los meses cominezan de cero donde enero es 0 y diciembre 11
        const year = selectedDate.getFullYear()
        const fecha = `${year}-${month}-${day}`
        const fecha2 = selectedDate.toISOString()
        return fecha

    }

    const [basicModal, setBasicModal] = useState(false);
    const [detailstoTable, setDetailToTable] = useState([])
    const [detailstoTableEdit, setDetailToTableEdit] = useState([])

    let tmp = []

    const setTableDetails = (data, update) => {
        //verifica si esta vacio para agregar el primer detalle, y si  lo esta
        //deja el primer o los primeros que tenga y va agrgando el resto a la lista
        //Agrega detailstoTable lo que testa en details que a su vez son los datos del fomulario modal
        //setDetailToTable es lo que lee la tabla de detalles

        //El update viene desde la lista de bultos ya guardadas

        let localClase = ''
        let localCorte = ''

        clases.map((i) => {
            if (parseInt(i.id) === parseInt(data.clase)) {
                localClase = i.nombre
            }
        })
        cortes.map((i) => {
            if (parseInt(i.id) === parseInt(data.corte)) {
                localCorte = i.nombre
            }
        })

        if (update) {
            //Verifica que los datos estan siendo recibidos directamente desde un row existente para actualizar
            //o si estan agregando datos nuevos

            bultos.map((i) => {
                if ((i.id) === (data)) {
                    (i.controlbultos_detalle).map((datos, i) => {
                        tmp.push({
                            'id': datos.id,
                            'libras': datos.libras,
                            'clase_id': (datos.clase).id,
                            'clase': (datos.clase).nombre,
                            'corte_id': (datos.corte).id,
                            'corte': (datos.corte).nombre
                        })
                    })
                }
            })
            if ((detailstoTable.length === 0)) {
                setDetailToTable(tmp)
            } else {
                setDetailToTable([])
                setDetailToTable(tmp)
            }

        } else {
            if (update_status) {
                if (detailstoTableEdit.length === 0) {
                    setDetailToTableEdit([{
                        'libras': data.libras,
                        'clase_id': data.clase,
                        'clase': localClase,
                        'corte_id': data.corte,
                        'corte': localCorte,
                        'bulto': data.id,
                    }])
                } else {
                    setDetailToTableEdit([...detailstoTableEdit, {
                        'libras': data.libras,
                        'clase_id': data.clase,
                        'clase': localClase,
                        'corte_id': data.corte,
                        'corte': localCorte,
                        'bulto': data.id,
                    }])
                }
            } else {
                if (detailstoTable.length === 0) {
                    setDetailToTable([{
                        'libras': data.libras,
                        'clase_id': data.clase,
                        'clase': localClase,
                        'corte_id': data.corte,
                        'corte': localCorte
                    }])
                } else {
                    setDetailToTable([...detailstoTable, {
                        'libras': data.libras,
                        'clase_id': data.clase,
                        'clase': localClase,
                        'corte_id': data.corte,
                        'corte': localCorte
                    }])
                }
            }
        }


    }
    const datosdetabla = () => {
        console.log(tmp)
    }
    const deleteRow = (name) => {
        //Recibe Name que es el numero de la fila del 0 en adelante
        //Crea una variable temporal con la lista de items
        const temp = [...detailstoTable];
        //borra 1 dato de la tabla temporal segun el name, en este caso el numero o count
        temp.splice(name, 1);
        //reasigna nuevamente los nuevos valores a la lista original
        setDetailToTable(temp)


    }
    const deleteRowEdit = (name) => {
        //Recibe Name que es el numero de la fila del 0 en adelante
        //Crea una variable temporal con la lista de items
        const temp = [...detailstoTableEdit];
        //borra 1 dato de la tabla temporal segun el name, en este caso el numero o count
        temp.splice(name, 1);
        //reasigna nuevamente los nuevos valores a la lista original
        setDetailToTableEdit(temp)
    }

    const onSubmit = ({finca, pilon, observacion, id}, resetForm) => {
        const tableDetail = detailstoTable.map((i) => {
            return {
                'libras': i.libras,
                'clase': i.clase_id,
                'corte': i.corte_id
            }
        })
        const tableDetailEdit = detailstoTableEdit.map((i) => {
            return {
                'libras': i.libras,
                'clase': i.clase_id,
                'corte': i.corte_id,
                'bulto': id,
            }
        })

        if (update_status) {
            if (tableDetailEdit.length === 0) {
                dispatch(simpleNotification('Agregue nuevos bultos con libras'))
            } else {
                dispatch(saveBultoEdit(tableDetailEdit, resetForm))
            }
        } else {
            dispatch(saveBulto(finca, pilon, observacion, tableDetail, resetForm))
        }

    }
    const deleteBulto = () => {

    }

    const librasLabelCreate = detailstoTable.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.libras);
    }, 0)

    const librasLabelEdit = detailstoTableEdit.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.libras);
    }, 0)

    const librasLabel = librasLabelCreate + librasLabelEdit

    return (
        <Fragment>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: '',
                    finca: '',
                    pilon: '',
                    observacion: '',

                }}
                validationSchema={validate}
                onSubmit={(values, {resetForm}) => {
                    onSubmit(values, resetForm)
                }}
            >
                {
                    ({isValid, dirty, values, setFieldValue, setFieldTouched, enableReinitialize}) => (
                        <Fragment>
                            <PageTitle_ active="Bultos" mother="Curacion" customText={"Control de Bultos"}/>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card">
                                        <div className={`card-header ${updateWarningClass}`}>
                                            <h4 className="card-title">Bultos </h4>
                                            <span
                                                className="w-space-no btn btn-primary shadow  light">{
                                                librasLabel
                                            }
                                            </span>
                                        </div>
                                        <Notifications/>
                                        <div className="card-body">
                                            <div className="basic-form">
                                                <Form>
                                                    <div className="form-row">
                                                        <SelectFormik options={optionFincas} value={values.finca}
                                                                      onChange={value => setFieldValue('finca', value.value)}
                                                                      name={'finca'} inputsize={'col-md-6'}
                                                                      label={'Fincas'}
                                                                      onBlur={() => setFieldTouched("finca", true)}
                                                        />

                                                        <SelectFormik options={optionPilon} value={values.pilon}
                                                                      onChange={value => setFieldValue('pilon', value.value)}
                                                                      name={'pilon'} inputsize={'col-md-2'}
                                                                      label={'Pilón'}/>


                                                        <div className="form-group col-md-3">
                                                            <label>Fecha</label>
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <DatePicker
                                                                    name={'fecha'}
                                                                    autoOk
                                                                    label=""
                                                                    disabled={true}
                                                                    clearable
                                                                    format="dd/MM/yyyy"
                                                                    disableFuture
                                                                    value={selectedDate}
                                                                    onChange={handleDateChange}
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </div>

                                                        <div className="form-row col-md-12">
                                                            <TextField label={'Observacion'} name={'observacion'}
                                                                       type={'textarea'}
                                                                       inputsize={"col-md-12"}/>
                                                        </div>

                                                    </div>


                                                    <div className={'form-row'}>
                                                        <div className={'form-group col-sm-4'}>
                                                            <Button variant={"secondary light"}
                                                                    onClick={() => setBasicModal(true)}>
                                                                Cargar Detalles
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/*TABLE DETAIL*/}

                                                    <CuracionTable detailstoTable={detailstoTable}
                                                                   deleteRow={deleteRow}/>

                                                    <CuracionTableUpdate detailstoTableEdit={detailstoTableEdit}
                                                                         deleteRowEdit={deleteRowEdit}/>


                                                    <div className={'form-row'}>
                                                        <div className={'form-group col-sm-4'}>
                                                            <Button type="submit" variant="success">
                                                                Guardar
                                                            </Button>
                                                            <Button type="button" onClick={() => {
                                                                setFieldValue('pilon', 4)
                                                                datosdetabla()


                                                            }} variant="outline-primary">
                                                                test
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </Form>

                                                {/*Modal*/}
                                                <CuracionEntradaModal setBasicModal={setBasicModal}
                                                                      basicModal={basicModal}
                                                                      setTableDetails={setTableDetails}
                                                                      optionsClase={optionClase}
                                                                      optionsCorte={optionCorte}
                                                                      name={'pilon'}

                                                />

                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-12">
                                    <div className="card">

                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <CuracionListTable valores={setFieldValue} detailsList={bultos}
                                                                   deleteBulto={deleteBulto}
                                                                   setDetailToTable={setDetailToTable}
                                                                   detailstoTable={detailstoTable}
                                                                   setTableDetails={setTableDetails}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Fragment>
                    )
                }
            </Formik>
        </Fragment>

    );
};

export default connect(null, {pageTitle})(Bultos);