import React, {useMemo, useState} from 'react';
import DataTable from "react-data-table-component";
import {Button} from "react-bootstrap";
import {TextField} from "@material-ui/core";
import FilterComponent from "../../src/components/table/FilterComponent";

export const FincaTableDetails = ({valores, details, deleteFinca}) => {


    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        }
        ,
        {
            name: 'Nombre',
            selector: row => row.nombre,
            filterable: true,
        },
        {
            name: 'Descripcion',/*El nombre de la columna*/
            selector: row => row.descripcion, /*El dato que va cargar*/
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
                    onClick={() => deleteFinca(row.id, row.nombre)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>
                <Button
                    variant="btn mr-2 btn-warning shadow btn-xs sharp light"
                    type={"button"}
                    onClick={() => {
                        valores('nombre', row.nombre) // valores tiene setFieldValue que son los valores, se le pasa el nombre
                        //del nuevo valor a asignar y despues el valor que necesita
                        valores('descripcion', row.descripcion)
                        valores('id', row.id)

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

    const filteredItems = Object.values(details).filter(
        item =>
            JSON.stringify(item)
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

    return (
        <div>
            <DataTable
                title="Lista de Fincas"
                columns={columns}
                noDataComponent={"No hay datos que mostrar"}
                defaultSortField="nombre"
                data={filteredItems}/*Se le pasa details si no se quiere hacer una busqueda*/
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

export const AreaTableDetails = ({valores, details, deleteArea}) => {


    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        }
        ,
        {
            name: 'Nombre',
            selector: row => row.nombre,
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
                    onClick={() => deleteArea(row.id, row.nombre)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>
                <Button
                    variant="btn mr-2 btn-warning shadow btn-xs sharp light"
                    type={"button"}
                    onClick={() => {
                        valores('nombre', row.nombre) // valores tiene setFieldValue que son los valores, se le pasa el nombre
                        //del nuevo valor a asignar y despues el valor que necesita
                        valores('descripcion', row.descripcion)
                        valores('id', row.id)

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

    return (
        <div>
            <DataTable
                title="Lista de Areas"
                columns={columns}
                noDataComponent={"No hay datos que mostrar"}
                defaultSortField="nombre"
                data={filteredItems}/*Se le pasa details si no se quiere hacer una busqueda*/
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

export const PilonTableDetails = ({valores, details, deletePilon}) => {
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        }
        ,
        {
            name: 'Nombre',
            selector: row => row.nombre,
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
                    onClick={() => deletePilon(row.id, row.nombre)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>
                <Button
                    variant="btn mr-2 btn-warning shadow btn-xs sharp light"
                    type={"button"}
                    onClick={() => {
                        valores('nombre', row.nombre) // valores tiene setFieldValue que son los valores, se le pasa el nombre
                        //del nuevo valor a asignar y despues el valor que necesita
                        valores('descripcion', row.descripcion)
                        valores('id', row.id)

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

    return (
        <div>
            <DataTable
                title="Lista de Pilones"
                columns={columns}
                noDataComponent={"No hay datos que mostrar"}
                defaultSortField="nombre"
                data={filteredItems}/*Se le pasa details si no se quiere hacer una busqueda*/
                pagination
                striped
                highlightOnHover
                subHeader
                subHeaderAlign="right"
                subHeaderComponent={subHeaderComponent}
            />
        </div>
    );
}

export const ClaseTableDetails = ({valores, details, deleteClase}) => {
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        }
        ,
        {
            name: 'Nombre',
            selector: row => row.nombre,
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
                    onClick={() => deleteClase(row.id, row.nombre)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>
                <Button
                    variant="btn mr-2 btn-warning shadow btn-xs sharp light"
                    type={"button"}
                    onClick={() => {
                        valores('nombre', row.nombre) // valores tiene setFieldValue que son los valores, se le pasa el nombre
                        //del nuevo valor a asignar y despues el valor que necesita
                        valores('descripcion', row.descripcion)
                        valores('id', row.id)

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

    return (
        <div>
            <DataTable
                title="Lista de Clases"
                columns={columns}
                noDataComponent={"No hay datos que mostrar"}
                defaultSortField="nombre"
                data={filteredItems}/*Se le pasa details si no se quiere hacer una busqueda*/
                pagination
                striped
                highlightOnHover
                subHeader
                subHeaderAlign="right"
                subHeaderComponent={subHeaderComponent}
            />
        </div>
    );
}

export const CorteTableDatails = ({valores, details, deleteCorte})=>{
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
        }
        ,
        {
            name: 'Nombre',
            selector: row => row.nombre,
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
                    onClick={() => deleteCorte(row.id, row.nombre)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>
                <Button
                    variant="btn mr-2 btn-warning shadow btn-xs sharp light"
                    type={"button"}
                    onClick={() => {
                        valores('nombre', row.nombre) // valores tiene setFieldValue que son los valores, se le pasa el nombre
                        //del nuevo valor a asignar y despues el valor que necesita
                        valores('descripcion', row.descripcion)
                        valores('id', row.id)

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

    return (
        <div>
            <DataTable
                title="Lista de Cortes"
                columns={columns}
                noDataComponent={"No hay datos que mostrar"}
                defaultSortField="nombre"
                data={filteredItems}/*Se le pasa details si no se quiere hacer una busqueda*/
                pagination
                striped
                highlightOnHover
                subHeader
                subHeaderAlign="right"
                subHeaderComponent={subHeaderComponent}
            />
        </div>
    );
}