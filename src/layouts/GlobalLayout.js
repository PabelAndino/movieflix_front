import React, {useEffect, useState} from 'react';
import NavHeader from "./header/NavHeader";
import Header from "./header/Header";
import Sidebar from "./Sidebar";
import {ToastContainer} from "react-toastify";
import Footer from "./Footer";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../redux/action/auth";

const GlobalLayout = ({children}) => {

    const [height, setHeight] = useState();
    const [active, setActive] = useState(false)

    useEffect(()=>{
        setHeight(window.screen.height - 100);
        setActive(document.querySelectorAll(".metismenu a") ? true : false);

    },[])

    return (
        <div id="main-wrapper" className="show">
            <NavHeader/>

            <Header/>
            <Sidebar/>
            <div className="content-body" style={{minHeight: height}}>
                <div className="container-fluid">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />


                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default GlobalLayout;