
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Alert, Button} from "react-bootstrap";
import {notifyTopRight} from "../plugins/ToasterData";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const Notifications = () => {

    const notification = useSelector((state)=>state.notifications.notification)
    const type = useSelector((state)=>state.notifications.type)
    const message = useSelector((state)=>state.notifications.message)

    useEffect(()=>{
        if(notification){
            if(type === 'success'){

                return (
                    toast.success(`${message}` ,{theme:'dark'})
                )

            }else{
                return (
                    toast.error(`${message}`,{theme:'dark'})
                    /*toast.error(`${message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,

                    })*/
                )
            }
        }
    },[notification])


    return (<></>)

};

