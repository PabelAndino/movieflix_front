import React, {Fragment, useEffect} from 'react';
import PageTitle_ from "../../src/components/PageTitle";
import {CommentsAdminListTable} from "../../src/components/table/TableDetails";
import {useDispatch, useSelector} from "react-redux";
import {deactivateRating, loadGeneralComments} from "../../src/redux/action/movies";
import swal from "sweetalert";
import {disableUser} from "../../src/redux/action/adminUsers";
import {Notifications} from "../../src/components/Notifications/Notifications";

const AdminComments = () => {

    const dispatch = useDispatch()
    const comments = useSelector((state)=>state.commentsGeneral.comments)
    const state = useSelector((state)=>state.commentsGeneral.comments_action_success)

    useEffect(()=>{
        dispatch(loadGeneralComments())
    },[state])

    const deleteRate = (id, nombre, resetForm) => {
        swal({
            title: `Are you sure to desactivate the rating and comment for the movie ${nombre} ?`,
            text: "Ones it is desactivate you have to activate it again manually!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deactivateRating(id, resetForm))
            } else {
                swal("You canceled the desactivation!");
            }
        })

    }

    return (
        <Fragment>
            <PageTitle_ active="Comments" mother="Rating" customText={"Comments Admin"}/>
            <div className="row">

                <div className="col-12">
                    <div className="card">
                        < Notifications/>
                        <div className="card-body">
                            <div className="table-responsive">
                                <CommentsAdminListTable detailsList={comments} deleteRate={deleteRate} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default AdminComments;