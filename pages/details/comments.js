import React, {Fragment, useEffect} from 'react';
import PageTitle_ from "../../src/components/PageTitle";
import {Notifications} from "../../src/components/Notifications/Notifications";
import CuracionListTable from "../curacion/curacionListTable";
import {CommentsListTable} from "../../src/components/table/TableDetails";
import {useDispatch, useSelector} from "react-redux";
import {loadGeneralComments} from "../../src/redux/action/movies";

const Comments = () => {
    const dispatch = useDispatch()
    const comments = useSelector((state)=>state.commentsGeneral.comments)

    useEffect(()=>{
        dispatch(loadGeneralComments())
    },[])

    return (
        <Fragment>
            <PageTitle_ active="Bultos" mother="Curacion" customText={"Control de Bultos"}/>
            <div className="row">

                <div className="col-12">
                    <div className="card">

                        <div className="card-body">
                            <div className="table-responsive">
                                <CommentsListTable detailsList={comments} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default Comments;