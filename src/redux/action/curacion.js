import axios from "axios";
import {
    ACTION_BULTOS_FAIL,
    ACTION_BULTOS_SUCCESS,
    BULTO_DEACTIVATE, LOAD_BULTOS_SUCCESS,
    LOADING_DEACTIVATE,
    NOTIFIACIONS_SUCCESS,
    NOTIFICATION_RESET, NOTIFICATIONS_FAILURE, SET_DEFAULT
} from "./type";

const _api = process.env.NEXT_PUBLIC_API
export const access = () => {
    return localStorage.getItem('access')
}

export const saveBulto = (finca, pilon, observacion, detalles_bulto, resetForm) => async dispatch => {
    let error = ''
    const token = access()
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    const body = JSON.stringify({finca, observacion, pilon, detalles_bulto})

    try {
        await axios.post(`${_api}/bultos/`, body, header).then(({data}) => {

            if (!data.Error) {
                dispatch({
                    type: ACTION_BULTOS_SUCCESS,
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
                    type: BULTO_DEACTIVATE
                })

                resetForm()
            } else {
                dispatch({
                    type: ACTION_BULTOS_FAIL,
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
    } catch (e) {
        if (`${e}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = e.response.data.detail

        }

        dispatch({
            type: ACTION_BULTOS_FAIL,
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

export const saveBultoEdit = (detalles_bulto, resetForm) => async dispatch => {
    let error = ''
    const token = access()
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    const body = JSON.stringify({detalles_bulto})
    try {
        await axios.post(`${_api}/bulto_detalles/`,body, header).then(({data})=>{
            if (!data.Error) {
                dispatch({
                    type: ACTION_BULTOS_SUCCESS,
                    payload: data.message
                })
                dispatch({
                    type: NOTIFIACIONS_SUCCESS,
                    payload: 'BULTO GUARDADO CORRECTAMENTE'
                })
                dispatch({
                    type: LOADING_DEACTIVATE,
                })
                dispatch({
                    type: NOTIFICATION_RESET,
                })
                dispatch({
                    type: BULTO_DEACTIVATE
                })
                dispatch({
                    type:SET_DEFAULT
                })
                resetForm()
            } else {
                dispatch({
                    type: ACTION_BULTOS_FAIL,
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
    }
    catch (e) {
        if (`${e}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = e.response.data.detail

        }

        dispatch({
            type: ACTION_BULTOS_FAIL,
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

export const loadBultos = () => async dispatch => {
    let error = ''
    const header = {
        headers: {
            "Content-Type": 'application/json'
        }
    }

    try {
        await axios.get(`${_api}/bultos/`, header).then(({data}) => {
            dispatch({
                type: LOAD_BULTOS_SUCCESS,
                payload: data.data
            })
        })
    } catch (e) {
        if (`${e}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = e.response.data.detail
        }
    }
}