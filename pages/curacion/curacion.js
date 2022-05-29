import React, {Fragment, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {moodChange, pageTitle} from "../../src/redux/action/utils";
import PageTitle_ from "../../src/components/PageTitle";
import {Button, ButtonGroup, Card, Col, Dropdown, Modal, Row, SplitButton} from "react-bootstrap";


import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Select from "react-select";
import Table from "../../src/components/Table";
import Link from "next/link";
import CuracionTable from "./curacionTable";
import CuracionEntradaModal from "./curacionEntradaModal";
import {loadFinca} from "../../src/redux/action/general";


const Curacion = () => {

    const dispatch = useDispatch()
    const fincas = useSelector((state) => state.general.finca)
    const dataState = '' //useSelector((state) => state.crud.dataSuccess)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        ruc: ''
    })

    const [formDetailData, setFormDetailData] = useState({
        name: '',
        buy_price: '',
        sell_price: '',
        c_gst: '',
        s_gst: '',
        stock: ''

    })


    useEffect(() => {
        dispatch(loadFinca())
    }, [])


    const data = ''



    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })



    const dataTable = data ? ('') : ''
    const [selectedDate, handleDateChange] = useState(new Date());
    //const fecha = selectedDate.toLocaleDateString() //    9/16/2021
    //el useState de company que cambiara segun el onchange del picker


    //El select picker usa para asignar con su propiedad onChange el setSelectOptionPresentacion,
    const [finca, setSelectOptionPresentacion] = useState();
    //las opciones por defecto que cuando haga el onchange le pasara al useState y que no tiene datos
    const optionsNoData = [
        {value: null, label: "No data"},
    ];
    //las opciones por defecto que cuando haga el onchange le pasara al useState
    const optionPresentacion = fincas ? (fincas.map((i) => {
        return {
            value: i.id,
            label: `${i.nombre} ${i.descripcion} `
        }
    })) : optionsNoData
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

    const setCounteronAdd = (data) => {

        //verifica si esta vacio para agregar el primer detalle, y si  lo esta
        //deja el primer o los primeros que tenga y va agrgando el resto a la lista
        //Agrega detailstoTable lo que testa en details que a su vez son los datos del fomulario modal
        //setDetailToTable es lo que lee la tabla de detalles
        if (detailstoTable.length === 0) {
            setDetailToTable([data])

        } else {
            setDetailToTable([...detailstoTable, data])
        }

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
    const onSubmit = e => {
        e.preventDefault();
        console.log(detailstoTable)
    }
    const onSubmitDetail = e => {
        e.preventDefault();
        const fecha = printDate()
        const {name, buy_price, sell_price, c_gst, s_gst, stock} = formDetailData
        //console.log(name,medical_type.value,buy_price,sell_price,c_gst,s_gst,fecha,stock,selectOptionCompany.value,detailstoTable)
        //dispatch(saveDetails(detailstoTable))
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            //dispatch(saveDetails(name, medical_type.value, buy_price, sell_price, c_gst, s_gst, fecha, stock, selectOptionCompany.value, detailstoTable))
        }
    }


    return (
        <Fragment>
            <PageTitle_ active="Curacion" mother="Curacion" customText={"Control de Bultos"}/>
            <div className="row">

                <div className="col-xl-12 col-lg-12">

                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Bultos</h4>
                        </div>
                        {/*<Notification />*/}
                        <div className="card-body">
                            <div className="basic-form">
                                <form onSubmit={onSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Finca</label>
                                            <Select
                                                defaultValue={finca}
                                                onChange={setSelectOptionPresentacion}
                                                options={optionPresentacion}
                                            />

                                        </div>
                                        <div className="form-group col-md-6">
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
                                        <div className="form-group col-md-12">
                                            <label>Observacion</label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Observacion"
                                                name={'address'}
                                                onChange={onChange}
                                                rows={4}
                                            />
                                        </div>

                                    </div>


                                    <div className={'form-row'}>
                                        <div className={'form-group col-sm-4'}>
                                            <Button variant={"secondary light"} onClick={() => setBasicModal(true)}>
                                                Cargar Detalles
                                            </Button>
                                        </div>
                                    </div>

                                    {/*TABLE DETAIL*/}
                                   <CuracionTable detailstoTable={detailstoTable} deleteRow={deleteRow}/>

                                    <div className={'form-row'}>
                                        <div className={'form-group col-sm-2'}>
                                            <Button type="submit" variant="success">
                                                Guardar
                                            </Button>
                                        </div>
                                    </div>


                                    {/*Modal*/}
                                    <CuracionEntradaModal setBasicModal={setBasicModal} basicModal={basicModal} setCounteronAdd={setCounteronAdd}   />
                                </form>
                            </div>
                        </div>

                    </div>

                </div>



                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Envios</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                {dataTable}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>

    );
};

export default connect(null, {pageTitle})(Curacion);