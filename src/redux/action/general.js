import axios from "axios";
import {
    LOAD_FINCA_SUCCESS,
    LOAD_FINCA_FAILURE,
    NOTIFIACIONS_SUCCESS,
    NOTIFICATIONS_FAILURE,
    LOADING_DEACTIVATE,
    LOADING_ACTIVATE,
    NOTIFICATION_RESET,
    FINCA_SUCCESS,
    FINCA_FAILURE,
    FINCA_DEACTIVATE,
    LOAD_AREA_SUCCESS,
    LOAD_AREA_FAILURE,
    AREA_SUCESS,
    AREA_DEACTIVATE,
    AREA_FAILURE,
    LOAD_PILON_SUCCESS,
    LOAD_PILON_FAILURE,
    PILON_SUCCESS,
    PILON_DEACTIVATE,
    PILON_FAILURE,
    LOAD_CLASES_SUCCESS,
    LOAD_CORTE_FAILURE,
    CLASE_SUCCESS,
    CLASE_DEACTIVATE,
    CLASE_FAILURE,
    LOAD_CORTE_SUCCESS,
    CORTE_SUCCESS, CORTE_FAILURE, CORTE_DEACTIVATE, SET_UPDATE, SET_DEFAULT
} from "./type";
import {fechaActual} from "../../components/utils";

const _api = process.env.NEXT_PUBLIC_API
export const access = () => {
    return localStorage.getItem('access')
}


export const loadFinca = () => async dispatch => {
    let error = 'Error'
    try {

        await axios.get(`${_api}/finca/`,).then(({data}) => {
            dispatch({
                type: LOAD_FINCA_SUCCESS,
                payload: data.data
            })
        })

    } catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: LOAD_FINCA_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,
        })
        dispatch({
            type: LOADING_DEACTIVATE,
        })

    }

}

export const saveFinca = (nombre, descripcion, id, resetForm) => async dispatch => {

    let fecha = fechaActual()
    let error = 'Error'
    dispatch({
        type: LOADING_ACTIVATE,
    })
    const body = JSON.stringify({nombre, descripcion})
    const header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (!id) {

        try {
            await axios.post(`${_api}/finca/`, body, header).then(({data}) => {

                if (!data.error) {
                    dispatch({
                        type: FINCA_SUCCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'FINCA GUARDADA CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: FINCA_DEACTIVATE
                    })

                    resetForm()
                } else {
                    dispatch({
                        type: FINCA_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATION_RESET,
                    })
                    dispatch({
                        type: LOADING_DEACTIVATE
                    })

                }
            })
        } catch (err) {

            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: FINCA_FAILURE,
                payload: 'No se pudo guardar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    } else {

        dispatch({
            type: LOADING_DEACTIVATE
        })
        const arg = JSON.stringify(
            {
                "nombre": nombre,
                "descripcion": descripcion,
                "fecha_modifica": fecha,
                "estado": true
            }
        )

        try {
            await axios.put(`${_api}/finca/${id}/`, arg, header).then(({data}) => {

                if (!(data.error)) {
                    dispatch({
                        type: FINCA_SUCCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'FINCA ACTUALIZADA CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: FINCA_DEACTIVATE
                    })

                    resetForm()
                } else {
                    dispatch({
                        type: FINCA_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE
                    })
                }

            })

        } catch (err) {

            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: FINCA_FAILURE,
                payload: 'No se pudo desactivar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    }

}

export const deactivateFinca = (id) => async dispatch => {

    let error = 'Error'

    dispatch({
        type: LOADING_ACTIVATE
    })
    const arg = JSON.stringify({"estado": false})
    const header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {

        await axios.patch(`${_api}/disable_finca/${id}/`, arg, header).then(({data}) => {

            if (!(data.error)) {
                dispatch({
                    type: FINCA_SUCCESS,
                    payload: data.message
                })

                dispatch({
                    type: NOTIFIACIONS_SUCCESS,
                    payload: 'FINCA DESACTIVADA CORRECTAMENTE'
                })

                dispatch({
                    type: LOADING_DEACTIVATE,
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })

                dispatch({
                    type: FINCA_DEACTIVATE
                })
            } else {
                dispatch({
                    type: FINCA_FAILURE,
                    payload: `Ocurrio un error al desactivar: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: NOTIFICATIONS_FAILURE,
                    payload: `Ocurrio un error al desactivar: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: LOADING_DEACTIVATE
                })
            }

        })

    } catch (err) {

        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: FINCA_FAILURE,
            payload: 'No se pudo desactivar'
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,

        })
        dispatch({
            type: LOADING_DEACTIVATE
        })
    }

}

export const loadArea = () => async dispatch => {
    let error = ''
    const token = access()
    let header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        await axios.get(`${_api}/areas/`, header).then(({data}) => {
            dispatch({
                type: LOAD_AREA_SUCCESS,
                payload: data.data
            })
        })
    } catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: LOAD_AREA_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,
        })
        dispatch({
            type: LOADING_DEACTIVATE,
        })
    }
}

export const saveArea = (nombre, estado, id, resetForm) => async dispatch => {

    let error = 'Error'
    const token = access()
    dispatch({
        type: LOADING_ACTIVATE,
    })

    const body = JSON.stringify({nombre})
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        }
    }

    if (!id) {
        try {
            await axios.post(`${_api}/areas/`, body, header).then(({data}) => {
                if (!data.error) {
                    dispatch({
                        type: AREA_SUCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'FINCA GUARDADA CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: AREA_DEACTIVATE
                    })

                    resetForm()
                } else {
                    dispatch({
                        type: AREA_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATION_RESET,
                    })
                    dispatch({
                        type: LOADING_DEACTIVATE
                    })

                }
            })
        } catch (err) {
            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: AREA_FAILURE,
                payload: 'No se pudo guardar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    } else {
        dispatch({
            type: LOADING_DEACTIVATE
        })
        const arg = JSON.stringify(
            {
                "nombre": nombre,
                "estado": true
            }
        )

        try {
            await axios.put(`${_api}/areas/${id}/`, arg, header).then(({data}) => {

                if (!(data.error)) {
                    dispatch({
                        type: AREA_SUCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'FINCA ACTUALIZADA CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: AREA_DEACTIVATE
                    })

                    resetForm()
                } else {
                    dispatch({
                        type: AREA_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE
                    })
                }

            })

        } catch (err) {

            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: AREA_FAILURE,
                payload: 'No se pudo desactivar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    }

}

export const deactivateArea = (id) => async dispatch => {

    let error = 'Error'
    const token = access()
    const arg = JSON.stringify({"estado": false})
    dispatch({
        type: LOADING_ACTIVATE
    })
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    }

    try {
        await axios.patch(`${_api}/areas/disable/${id}/`, arg, header).then(({data}) => {

            if (!(data.error)) {
                dispatch({
                    type: AREA_SUCESS,
                    payload: data.message
                })

                dispatch({
                    type: NOTIFIACIONS_SUCCESS,
                    payload: 'FINCA DESACTIVADA CORRECTAMENTE'
                })

                dispatch({
                    type: LOADING_DEACTIVATE,
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })

                dispatch({
                    type: AREA_DEACTIVATE
                })
            } else {
                dispatch({
                    type: AREA_FAILURE,
                    payload: `Ocurrio un error al desactivar: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: NOTIFICATIONS_FAILURE,
                    payload: `Ocurrio un error al desactivar: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: LOADING_DEACTIVATE
                })
            }

        })
    } catch (err) {

        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: AREA_FAILURE,
            payload: 'No se pudo desactivar'
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,

        })
        dispatch({
            type: LOADING_DEACTIVATE
        })
    }

}

export const loadPilon = () => async dispatch => {

    let error = ''
    const token = access()
    let header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        await axios.get(`${_api}/pilones/`, header).then(({data}) => {
            dispatch({
                type: LOAD_PILON_SUCCESS,
                payload: data.data
            })
        })
    } catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: LOAD_PILON_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,
        })
        dispatch({
            type: LOADING_DEACTIVATE,
        })
    }

}

export const savePilon = (nombre, id,resetForm) => async dispatch =>{
    let error = 'Error'
    const token = access()
    dispatch({
        type: LOADING_ACTIVATE,
    })

    const body = JSON.stringify({nombre})
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        }
    }

    if (!id) {
        try {
            await axios.post(`${_api}/pilones/`, body, header).then(({data}) => {
                if (!data.error) {
                    dispatch({
                        type: PILON_SUCCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'PILON GUARDADO CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: PILON_DEACTIVATE
                    })

                    resetForm()
                } else {
                    dispatch({
                        type: PILON_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATION_RESET,
                    })
                    dispatch({
                        type: LOADING_DEACTIVATE
                    })

                }
            })
        } catch (err) {
            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: PILON_FAILURE,
                payload: 'No se pudo guardar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    }else{
        dispatch({
            type: LOADING_DEACTIVATE
        })
        const arg = JSON.stringify(
            {
                "nombre": nombre,
                "estado": true
            }
        )

        try {
            await axios.put(`${_api}/pilones/${id}/`, arg, header).then(({data}) => {

                if (!(data.error)) {
                    dispatch({
                        type: PILON_SUCCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'PILON ACTUALIZADO CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: PILON_DEACTIVATE
                    })

                    resetForm()
                }
                else {
                    dispatch({
                        type: PILON_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE
                    })
                }

            })

        } catch (err) {

            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: PILON_FAILURE,
                payload: 'No se pudo desactivar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    }
}


export const deactivatePilon = (id)=>async dispatch =>{
    let error = 'Error'
    const token = access()
    const arg = JSON.stringify({"estado": false})
    dispatch({
        type: LOADING_ACTIVATE
    })
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    }

    try {
        await axios.patch(`${_api}/pilones/disable/${id}/`, arg, header).then(({data}) => {

            if (!(data.error)) {
                dispatch({
                    type: PILON_SUCCESS,
                    payload: data.message
                })

                dispatch({
                    type: NOTIFIACIONS_SUCCESS,
                    payload: 'PILON DESACTIVADO CORRECTAMENTE'
                })

                dispatch({
                    type: LOADING_DEACTIVATE,
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })

                dispatch({
                    type: PILON_DEACTIVATE
                })
            }
            else {
                dispatch({
                    type: PILON_FAILURE,
                    payload: `Ocurrio un error al desactivar el pilón: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: NOTIFICATIONS_FAILURE,
                    payload: `Ocurrio un error al desactivar: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: LOADING_DEACTIVATE
                })
            }

        })
    }
    catch (err) {

        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: PILON_FAILURE,
            payload: 'No se pudo desactivar'
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,

        })
        dispatch({
            type: LOADING_DEACTIVATE
        })
    }
}

export const claseLoad = () =>async dispatch =>{
    /*
    * ROTO GRANDE
    * MEDIANO BUENO
    * PEQUEÑO
    * MEDIANO ROTO
    * ROTO SUELTO
    * BUENO GRANDE
    * */

    let error = ''
    const token = access()
    let header = {
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    }


    try{
        await axios.get(`${_api}/clase/`,header).then(({data})=>{
            dispatch({
                type:LOAD_CLASES_SUCCESS,
                payload: data.data
            })
        })

    }catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: LOAD_CLASES_SUCCESS,
            payload: error
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,
        })
        dispatch({
            type: LOADING_DEACTIVATE,
        })

    }

}

export const saveClase = (nombre, id, resetForm) => async dispatch =>{
    let error = 'Error'
    const token = access()
    dispatch({
        type: LOADING_ACTIVATE,
    })

    const body = JSON.stringify({nombre})
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        }
    }

    if(!id){
        try{
            await axios.post(`${_api}/clase/`,body, header).then(({data})=>{
                if (!data.error) {
                    dispatch({
                        type: CLASE_SUCCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'CLASE GUARDADA CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: CLASE_DEACTIVATE
                    })

                    resetForm()
                }
                else {
                    dispatch({
                        type: CLASE_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATION_RESET,
                    })
                    dispatch({
                        type: LOADING_DEACTIVATE
                    })
                }
            })
        }catch (err) {
            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: CLASE_FAILURE,
                payload: 'No se pudo guardar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    }
    else{
        dispatch({
            type: LOADING_DEACTIVATE
        })
        const body = JSON.stringify(
            {
                "nombre": nombre,
                "estado": true
            }
        )

        try {
            await axios.put(`${_api}/clase/${id}/`,body, header).then(({data})=>{
                if (!(data.error)) {
                    dispatch({
                        type: CLASE_SUCCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'CLASE ACTUALIZADA CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: CLASE_DEACTIVATE
                    })

                    resetForm()
                }
                else {
                    dispatch({
                        type: CLASE_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE
                    })
                }
            })
        }catch (err) {
            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: CLASE_FAILURE,
                payload: 'No se pudo desactivar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    }


}

export const desactivateClase =(id)=>async dispatch =>{
    let error = 'Error'
    const token = access()
    const body = JSON.stringify({"estado": false})
    dispatch({
        type: LOADING_ACTIVATE
    })
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    }

    try {
        await axios.patch(`${_api}/clase/disable/${id}/`,body, header).then(({data})=>{
            if (!(data.error)) {
                dispatch({
                    type: CLASE_SUCCESS,
                    payload: data.message
                })

                dispatch({
                    type: NOTIFIACIONS_SUCCESS,
                    payload: 'CLASE DESACTIVADA CORRECTAMENTE'
                })

                dispatch({
                    type: LOADING_DEACTIVATE,
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })

                dispatch({
                    type: CLASE_DEACTIVATE
                })
            }
            else {
                dispatch({
                    type: CLASE_FAILURE,
                    payload: `Ocurrio un error al desactivar la clase: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: NOTIFICATIONS_FAILURE,
                    payload: `Ocurrio un error al desactivar: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: LOADING_DEACTIVATE
                })
            }
        })
    }catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: CLASE_FAILURE,
            payload: 'No se pudo desactivar'
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,

        })
        dispatch({
            type: LOADING_DEACTIVATE
        })
    }

}

export const corteLoad = () =>async dispatch =>{
 /*
 * CORTE 1
 * CORTE 2
 * CORTE 3
 * CORTE 4
 * CORTE 5
 * CORTE 6
 * CORTE 7
 * */

    let error = ''
    const token = access()
    let header = {
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    }


    try{
        await axios.get(`${_api}/corte/`,header).then(({data})=>{
            dispatch({
                type:LOAD_CORTE_SUCCESS,
                payload: data.data
            })
        })

    }catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: LOAD_CORTE_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,
        })
        dispatch({
            type: LOADING_DEACTIVATE,
        })

    }

}

export const saveCorte = (nombre, id, resetForm) =>async dispatch => {
    let error = 'Error'
    const token = access()
    dispatch({
        type: LOADING_ACTIVATE,
    })

    const body = JSON.stringify({nombre})
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        }
    }

    if(!id){
        try{
            await axios.post(`${_api}/corte/`,body, header).then(({data})=>{
                if (!data.error) {
                    dispatch({
                        type: CORTE_SUCCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'CLASE GUARDADA CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: CLASE_DEACTIVATE
                    })

                    resetForm()
                }
                else {
                    dispatch({
                        type: CORTE_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al guardar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATION_RESET,
                    })
                    dispatch({
                        type: LOADING_DEACTIVATE
                    })
                }
            })
        }catch (err) {
            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: CORTE_FAILURE,
                payload: 'No se pudo guardar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    }
    else{
        dispatch({
            type: LOADING_DEACTIVATE
        })
        const body = JSON.stringify(
            {
                "nombre": nombre,
                "estado": true
            }
        )

        try {
            await axios.put(`${_api}/corte/${id}/`,body, header).then(({data})=>{
                if (!(data.error)) {
                    dispatch({
                        type: CORTE_SUCCESS,
                        payload: data.message
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'CLASE ACTUALIZADA CORRECTAMENTE'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: CORTE_DEACTIVATE
                    })

                    resetForm()
                }
                else {
                    dispatch({
                        type: CORTE_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `Ocurrio un error al actualizar: ${JSON.stringify(data.details)}`
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE
                    })
                }
            })
        }catch (err) {
            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: CORTE_FAILURE,
                payload: 'No se pudo desactivar'
            })
            dispatch({
                type: NOTIFICATIONS_FAILURE,
                payload: error
            })
            dispatch({
                type: NOTIFICATION_RESET,

            })
            dispatch({
                type: LOADING_DEACTIVATE
            })
        }
    }
}

export const desactivateCorte = (id)=>async dispatch => {
    let error = 'Error'
    const token = access()
    const arg = JSON.stringify({"estado": false})
    dispatch({
        type: LOADING_ACTIVATE
    })
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    }

    try {
        await axios.patch(`${_api}/corte/disable/${id}/`, arg, header).then(({data}) => {

            if (!(data.Error)) {
                dispatch({
                    type: CORTE_SUCCESS,
                    payload: data.message
                })

                dispatch({
                    type: NOTIFIACIONS_SUCCESS,
                    payload: 'CORTE DESACTIVADO CORRECTAMENTE'
                })

                dispatch({
                    type: LOADING_DEACTIVATE,
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })

                dispatch({
                    type: CORTE_DEACTIVATE
                })
            }
            else {
                dispatch({
                    type: CORTE_FAILURE,
                    payload: `Ocurrio un error al desactivar el pilón: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: NOTIFICATIONS_FAILURE,
                    payload: `Ocurrio un error al desactivar: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: LOADING_DEACTIVATE
                })
            }

        })
    }
    catch (err) {

        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: CORTE_FAILURE,
            payload: 'No se pudo desactivar'
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,

        })
        dispatch({
            type: LOADING_DEACTIVATE
        })
    }
}


export const setUpdate = (state)=> dispatch =>{
    if(state){
        dispatch({
            type:SET_UPDATE
        })
    }else{
        dispatch({
            type:SET_DEFAULT
        })
    }
}