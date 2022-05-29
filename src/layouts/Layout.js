import Router, {useRouter} from "next/router";
import {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {getAccessToken, getUser} from "../redux/action/auth";

import Footer from "./Footer";
import Header from "./header/Header";//./header/Header
import NavHeader from "./header/NavHeader";
import PreLoader from "./PreLoader";
import {ToastContainer} from "react-toastify";
import Sidebar from "./Sidebar";
import GlobalLayout from "./GlobalLayout";
import {moodChange} from "../redux/action/utils";
import {themeVersionAction} from "../redux/action/themeAction";


const Layout = ({children}) => {

    const dispatch = useDispatch()

    const [logged, setLogged] = useState(true)
    const router = useRouter()
    const user = useSelector((state) => state.auth.user)


    useEffect(() => {
        //dispatch(themeVersionAction('dark'))
        themeVersionAction('dark')
        moodChange();
        //const userLocal = window.localStorage.getItem('user')
        //dispatch(getUser())
        //dispatch(getAccessToken)
        /*if (!userLocal) {
            //router.push('/account/login')
        } else {
            //setLogged(true)
        }*/
    }, []);


    return (
        <Fragment>
            {!logged ? (
                <PreLoader/>

            ) : (
                <GlobalLayout children={children}/>
            )}
        </Fragment>
    );
};

export default (Layout);
