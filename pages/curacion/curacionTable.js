import React from 'react';
import {Button} from "react-bootstrap";

export const CuracionTable = ({detailstoTable, deleteRow}) => {
    return (
        <div>
            <div className={'form-group col-md-12'}>
                <div className="table-responsive">
                    <table className="table table-responsive-md" id="">
                        <thead>
                            <tr>

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
                                    <strong>Remover</strong>
                                </th>
                            </tr>
                            </thead>
                        <tbody id="bs_customers_all">
                            {detailstoTable &&
                            detailstoTable.map((table,i) => (
                                <tr key={i}>

                                    <td>{table.libras}</td>
                                    <td>{table.clase}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {table.corte}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Button
                                                variant="btn btn-danger shadow btn-xs sharp light"
                                                onClick={() => deleteRow(i)}
                                            >
                                                <i className="fa fa-trash"/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export const CuracionTableUpdate = ({detailstoTableEdit, deleteRowEdit}) => {
    return (
        <div>
            <div className={'form-group col-md-12'}>
                <div className="table-responsive">
                    <table className="table table-responsive-md" id="">
                            <thead>
                            <tr>
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
                                    <strong>Remover</strong>
                                </th>
                            </tr>
                            </thead>
                            <tbody id="bs_customers_all">
                            {detailstoTableEdit &&
                                detailstoTableEdit.map((table,i) => (
                                    <tr key={i} className={'bg-secondary-light'}>
                                        <td><strong>{table.libras}</strong></td>
                                        <td>{table.clase}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                {table.corte}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <Button
                                                    variant="btn btn-danger shadow btn-xs sharp light"
                                                    onClick={() => {
                                                        deleteRowEdit(i)
                                                    }}
                                                >
                                                    <i className="fa fa-trash"/>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    );
}
