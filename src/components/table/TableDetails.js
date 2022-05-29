import React, {useMemo, useState, Fragment} from 'react';
import {Button} from "react-bootstrap";
import FilterComponent from "./FilterComponent";
import DataTable from "react-data-table-component";
import {useDispatch} from "react-redux";
import {setUpdate} from "../../redux/action/general";

export const CommentsListTable = ({ setValues ,detailsList}) => {

    const details = detailsList ? detailsList : ''
    const dispatch = useDispatch()

    const columns = [
        {
            name: 'Movie',
            selector: row => (<img className={'rounded-lg shadow-sm p-3'} style={{width: "40%"}} src={(row.movie).image_poster}/>) ,
            sorteable:true
        },
        {
            name: 'Title',
            selector: row => (<h4><strong>{(row.movie).title}</strong></h4>) ,
            filterable: true,
            sorteable:true
        },
        {
            name: 'Comment',
            selector: row => row.comment,
            filterable: true,
        },
        {
            name: 'Rate',
            selector: row =>  ( <div className="rating-stars btn btn-primary rounded-lg  " ><h3><i className="fa fa-star fa-fw"/>{row.raiting}</h3></div>),
            filterable: true,
        }

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
                                    <strong>Comments</strong>
                                </th>

                            </tr>
                            </thead>
                            <tbody id="bs_customers_all">
                            {

                                <tr className={'table-info'} key={data.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                                                    <span
                                                                        className="w-space-no">{data.comment}
                                                                    </span>
                                        </div>
                                    </td>

                                </tr>



                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        );
    }



    return (
        <div className={'form-row'}>
            <DataTable
                title="Comments lists"
                columns={columns}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                noDataComponent={"No data"}
                defaultSortFieldId={1}
                data={filteredItems}//Se le pasa details si no se quiere hacer una busqueda
                pagination
                striped
                highlightOnHover
                subHeader
                subHeaderAlign="right"
                subHeaderComponent={subHeaderComponent}
                theme="dark"
            />
        </div>
    );
};

export const CommentsAdminListTable = ({ setValues ,detailsList, deleteRate}) => {

    const details = detailsList ? detailsList : ''
    const dispatch = useDispatch()

    const columns = [
        {
            name: 'Movie',
            selector: row => (<img className={'rounded-lg shadow-sm p-3'} style={{width: "40%"}} src={(row.movie).image_poster}/>) ,
            sorteable:true
        },
        {
            name: 'Title',
            selector: row => (<h4><strong>{(row.movie).title}</strong></h4>) ,
            filterable: true,
            sorteable:true
        },
        {
            name: 'User',
            selector: row => (<h4><strong>{row.user_firstname}</strong></h4>) ,
            filterable: true,
            sorteable:true
        },
        {
            name: 'Rate',
            selector: row =>  ( <div className="rating-stars rounded-lg bg-warning align-items-center"  ><h3 className={'m-1 p-2'}><i className="fa fa-star fa-fw"/>{row.raiting}</h3></div>),
            filterable: true,
        },
        {
            name: 'Delete',/*El nombre de la columna*/
            cell: (row, index) => (<div className="d-flex align-items-center" >
                <Button
                    variant="btn mr-2 btn-danger shadow  sharp light"
                    type={"button"}
                    onClick={() => deleteRate(row.id, (row.movie).title)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>

            </div>),

            button: true

        }

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
                                    <strong>Comments</strong>
                                </th>

                            </tr>
                            </thead>
                            <tbody id="bs_customers_all">
                            {

                                <tr className={'table-info'} key={data.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                                                    <span
                                                                        className="w-space-no">{data.comment}
                                                                    </span>
                                        </div>
                                    </td>

                                </tr>



                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        );
    }



    return (
        <div className={'form-row'}>
            <DataTable
                title="Comments lists"
                columns={columns}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                noDataComponent={"No data"}
                defaultSortFieldId={1}
                data={filteredItems}//Se le pasa details si no se quiere hacer una busqueda
                pagination
                striped
                highlightOnHover
                subHeader
                subHeaderAlign="right"
                subHeaderComponent={subHeaderComponent}
                theme="dark"
            />
        </div>
    );
};



export const UserDetailsTable = ({setFieldValue, details, deleteUser,resetForm}) => {


    const columns = [
        {
            name: 'Profile',
            selector: row => (<img className={'rounded-pill  p-3'} style={{width: "40%"}} src={row.user_image}/>) ,

        },
        {
            name: 'Id',
            selector: row => <h4>{row.id}</h4> ,
        }
        ,
        {
            name: 'Name',
            selector: row =><h4>{row.first_name}</h4> ,
            filterable: true,
        },

        {
            name: 'Last Name',/*El nombre de la columna*/
            selector: row => <h4>{row.last_name}</h4> , /*El dato que va cargar*/
        },
        {
            name: 'User Name',/*El nombre de la columna*/
            selector: row => <h4>{row.username}</h4>, /*El dato que va cargar*/
        },
        {
            name: 'email',/*El nombre de la columna*/
            selector: row => <h4>{row.email}</h4> , /*El dato que va cargar*/
        },
        {
            name: 'Estado',/*El nombre de la columna*/
            cell: (row, index) => (<div className="d-flex align-items-center" >
                <Button
                    variant="btn mr-2 btn-danger shadow  sharp light"
                    type={"button"}
                    onClick={() => deleteUser(row.id, row.first_name, resetForm)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>
                <Button
                    variant="btn mr-2 btn-warning shadow  sharp light"
                    type={"button"}
                    onClick={() => {
                        resetForm()
                        setFieldValue('id', row.id)
                        setFieldValue('first_name', row.first_name)
                        setFieldValue('last_name', row.last_name)
                        setFieldValue('email', row.email)
                        setFieldValue('username', row.username)
                        setFieldValue('user_image', row.user_image)
                        setFieldValue('disabled', true)
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
        <Fragment >
            <DataTable
                title="User Lists"
                columns={columns}
                noDataComponent={"There's not data to show"}
                defaultSortField="Name"
                data={filteredItems}/*Se le pasa details si no se quiere hacer una busqueda*/
                pagination
                striped
                highlightOnHover
                subHeader
                subHeaderAlign="right"
                subHeaderComponent={subHeaderComponent}
                theme="dark"
            />
        </Fragment>
    );
};


export const MoviesAdminTable = ({setFieldValue, details, deleteMovie,resetForm}) => {


    const columns = [
        {
            name: 'Poster',
            selector: row => (<img className={'rounded-lg shadow-lg  p-3'} style={{width: "30%"}} src={row.image_poster}/>) ,

        },
        {
            name: 'Id',
            selector: row => <h4>{row.id}</h4> ,
        }
        ,
        {
            name: 'Title',
            selector: row =><h4>{row.title}</h4> ,
            filterable: true,
        },

        {
            name: 'Last Name',/*El nombre de la columna*/
            selector: row => <h4>{row.release_date}</h4> , /*El dato que va cargar*/
        },

        {
            name: 'State',/*El nombre de la columna*/
            cell: (row, index) => (<div className="d-flex align-items-center" >
                <Button
                    variant="btn mr-2 btn-danger shadow  sharp light"
                    type={"button"}
                    onClick={() => deleteMovie(row.id, row.title, resetForm)
                    }
                >
                    <i className="fa fa-trash"/>
                </Button>
                <Button
                    variant="btn mr-2 btn-warning shadow  sharp light"
                    type={"button"}
                    onClick={() => {
                        resetForm()
                        setFieldValue('id', row.id)
                        setFieldValue('title', row.title)
                        setFieldValue('release_date', row.release_date)
                        setFieldValue('image_poster', row.image_poster)
                        setFieldValue('plot', row.plot)
                        setFieldValue('image_banner', row.image_banner)
                        setFieldValue('genre', row.genre)

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
        <Fragment >
            <DataTable
                title="User Lists"
                columns={columns}
                noDataComponent={"There's not data to show"}
                defaultSortField="Name"
                data={filteredItems}/*Se le pasa details si no se quiere hacer una busqueda*/
                pagination
                striped
                highlightOnHover
                subHeader
                subHeaderAlign="right"
                subHeaderComponent={subHeaderComponent}
                theme="dark"
            />
        </Fragment>
    );
};


/*
*
* {
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1MDc3MjgwNSwiaWF0IjoxNjUwNzQ0MDA1LCJqdGkiOiIwMTc5NDlkNWQ2MzU0ODJkOGVhNjgwYWRkMDRkNGFlZiIsInVzZXJfaWQiOjIsImZpcnN0X25hbWUiOm51bGwsImxhc3RfbmFtZSI6bnVsbCwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJ1c2VyX2ltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuZ2VuZXJhdGVkLnBob3Rvcy9NNUVHbFZBOVZHZkdvTjBYeEZOVkVFU1BVNHRvSGxDM2tnejJnaXZWMURZL3JzOmZpdDoyNTY6MjU2L2N6TTZMeTlwWTI5dWN6Z3UvWjNCb2IzUnZjeTF3Y205ay9MbkJvYjNSdmN5OHdNRGMwL056WTRMbXB3WncuanBnIn0.KRDoLmoZW_dvRcXp0iDwwU4ABbulKukFNb_EclIuNWg",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwNzcyODA1LCJpYXQiOjE2NTA3NDQwMDUsImp0aSI6IjNlZmZjYmIwMjQ0ZjQ1MTZhZmJiMjJjZTFlZDM1NDhkIiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6bnVsbCwibGFzdF9uYW1lIjpudWxsLCJpc19zdXBlcnVzZXIiOnRydWUsInVzZXJfaW1hZ2UiOiJodHRwczovL2ltYWdlcy5nZW5lcmF0ZWQucGhvdG9zL001RUdsVkE5VkdmR29OMFh4Rk5WRUVTUFU0dG9IbEMza2d6MmdpdlYxRFkvcnM6Zml0OjI1NjoyNTYvY3pNNkx5OXBZMjl1Y3pndS9aM0JvYjNSdmN5MXdjbTlrL0xuQm9iM1J2Y3k4d01EYzAvTnpZNExtcHdady5qcGcifQ.K1PxeVzrs-2EfTD7bzNmZ8pzyn0fHbZAFszN3mnmVcY"
}
*
* */