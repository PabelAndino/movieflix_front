import React, {useMemo, useState} from 'react';
import {Button} from "react-bootstrap";
import FilterComponent from "../../src/components/table/FilterComponent";
import DataTable from "react-data-table-component";
import {useDispatch} from "react-redux";
import {setUpdate} from "../../src/redux/action/general";

const CuracionListTable = ({valores, detailsList, deleteBulto, setDetailToTable, detailstoTable, setTableDetails}) => {

    const details = detailsList ? detailsList : valores
    const dispatch = useDispatch()

    const columns = [
        {
            name: 'Pilon',
            selector: row => (<h4><strong>{(row.pilon).nombre}</strong></h4>) ,
            filterable: true,
            sorteable:true
        },
        {
            name: 'Finca',
            selector: row => (row.finca).nombre,
            filterable: true,
        },
        {
            name: 'Observacion',
            selector: row =>  row.observacion,
            filterable: true,
        },
        {
            name: 'Estado',/*El nombre de la columna*/
            cell: (row, index) => (<div className="d-flex align-items-center">
                {/*<Button
                    variant="btn mr-2 btn-danger shadow btn-xs sharp light"
                    type={"button"}
                    onClick={() => deleteRow(index)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>   */} {/*//EL INDEX LE PASA LA COLUMNA A ELIMINAR DE LA FILA*/}

                <Button
                    variant="btn mr-2 btn-danger shadow btn-xs sharp light"
                    type={"button"}
                    onClick={() => deleteBulto(row.id, row.nombre)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>
                <Button
                    variant="btn mr-2 btn-warning shadow btn-xs sharp light"
                    type={"button"}
                    onClick={() => {
                        /*// valores tiene setFieldValue que son los valores, se le pasa el nombre
                        //del nuevo valor a asignar y despues el valor que necesita
                        */
                        //setTableDetails(row.controlbultos_detalle)
                        //setTableDetails(data,true)
                        valores('finca', (row.finca).id)
                        valores('pilon', (row.pilon).id)
                        valores('observacion', row.observacion)
                        valores('id', row.id)
                        dispatch(setUpdate(true))
                        setTableDetails(parseInt(row.id), true)

                    }}
                >
                    <i className="fa fa-edit"/>
                </Button>
            </div>),

            button: true
        },
    ]

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    /*Se usa si lo que recibe es un array y no un objeto*/
    /*const filteredItems = details.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );*/

    const filteredItems = Object.values(details).filter(item => JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };
        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    // data provides access to your row data, its come directly from the main row with
    //just the data that correspond to the selected row
    const ExpandedComponent = ({ data }) => {
       return  (

        <div>
            <div className={'form-group col-md-12'}>
                <div className="table-responsive table-striped">
                        <table className="table table-responsive-md" id="bs-table">
                            <thead>
                            <tr>

                                <th>
                                    <strong>Id Detalle</strong>
                                </th>
                                <th>
                                    <strong>Libras</strong>
                                </th>
                                <th>
                                    <strong>Clase</strong>
                                </th>
                                <th>
                                    <strong>Corte</strong>
                                </th>
                                <th>
                                    <strong>Bulto</strong>
                                </th>
                            </tr>
                            </thead>
                            <tbody id="bs_customers_all">
                            {



                                (data.controlbultos_detalle).map((table) =>
                                    <tr className={'table-info'} key={table.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                                    <span
                                                                        className="w-space-no">{table.id}
                                                                    </span>
                                            </div>
                                        </td>
                                        <td>{table.libras}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                {(table.clase).nombre}
                                            </div>
                                        </td>
                                        <td>{(table.corte).nombre}</td>
                                        <td>{table.bulto}</td>
                                    </tr>

                                )

                            }
                            </tbody>
                        </table>
                </div>
            </div>
        </div>


       );
    }



    return (
        <div>
            <DataTable
                title="Lista de Bultos"
                columns={columns}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                noDataComponent={"No hay datos que mostrar"}
                defaultSortFieldId={1}
                data={filteredItems}//Se le pasa details si no se quiere hacer una busqueda
                pagination
                striped
                highlightOnHover
                subHeader
                subHeaderAlign="right"
                subHeaderComponent={subHeaderComponent}
            />
        </div>
    );
};

export default CuracionListTable;

