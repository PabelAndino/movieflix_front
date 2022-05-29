import {auth} from "../../firebaseConfig";
import {
    AUTH_ERROR, LOAD_ACCESS_FAIL, LOAD_ACCESS_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_FAIL,
    NOTIFICATION_RESET,
    NOTIFICATIONS_FAILURE
} from "./type";
import axios from "axios";


const _api = process.env.NEXT_PUBLIC_API

export const registerUser = (userData) => (dispatch) => {
    const {email, password, username} = userData;
    auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            auth.currentUser.updateProfile({
                displayName: username,
            });
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    msg: "Register successfully completed",
                    auth: true,
                },
            });
            currentUser(dispatch);
        })
        .catch((error) => {
            dispatch({
                type: AUTH_ERROR,
                payload: {msg: error.message, auth: false},
            });
        });
};

export const loginUser = (userData) => async dispatch => {
    const {username, password} = userData
    const body = JSON.stringify({username, password})
    let error = ''
    const header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.post(`/api/account/login`, body, header).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('access',res.data.access)
                dispatch({
                    type: LOGIN_SUCCESS,

                })
            } else {
                dispatch({
                    type: LOGIN_FAILURE
                })
                dispatch({
                    type: NOTIFICATIONS_FAILURE,
                    payload: 'Ocurrio un error al iniciar sesion'
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })
            }

        })
    } catch (err) {
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: 'Ocurrio un error al iniciar sesion'
        })

        dispatch({
            type: NOTIFICATION_RESET,
        })
    }


}

export const getUser = () => async dispatch => {
    const header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        await axios.get(`/api/account/user`, header).then((res) => {

            if (res.status === 200) {
                if (res.data.user) {
                    window.localStorage.setItem('user', res.data.user)
                    dispatch({
                        type: LOAD_USER_SUCCESS,
                        payload: res.data.user
                    })
                    dispatch({
                        type: LOGIN_SUCCESS
                    })


                } else {
                    dispatch(logoutUser())
                }
            } else {
                //Router.replace('/account/login')
                dispatch(logoutUser())
                dispatch({
                    type: LOAD_USER_FAIL,
                })
                dispatch({
                    type: LOGOUT_USER,
                })
                dispatch({
                    type: NOTIFICATIONS_FAILURE,
                    payload: 'Ocurrio un error al iniciar sesion'
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })


            }

        })
    } catch (err) {
        //Router.replace('/account/login')
        dispatch(logoutUser())

        dispatch({
            type: LOGOUT_USER,
        })
        dispatch({
            type: LOAD_USER_FAIL,
        })

    }
}

export const logoutUser = () => async dispatch => {
    const header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        await axios.post(`/api/account/logout`, header).then((res) => {
            if (res.status === 200) {
                window.localStorage.removeItem("user")
                dispatch({
                    type: LOGOUT_USER,
                })
                dispatch({
                    type: LOGIN_FAILURE
                })
                localStorage.removeItem('access')
            } else {
                dispatch({
                    type: LOGOUT_USER_FAIL,
                })
                localStorage.removeItem('access')


            }

        })
    } catch (err) {
        dispatch({
            type: LOGOUT_USER_FAIL,
        })
        localStorage.removeItem('access')
    }
}

export const getAccessToken = () => async dispatch => {
    const header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        await axios.get('/api/account/get_access/', header).then((res) => {
            if (res.status === 200) {
                if (res.data.message === 1) {
                    dispatch({
                        type: LOAD_ACCESS_SUCCESS,
                    })
                } else {
                    dispatch({
                        type: LOAD_ACCESS_FAIL,
                    })
                    dispatch(logoutUser())

                }


            } else {
                dispatch(logoutUser())
                localStorage.removeItem('access')
            }
        })
    } catch (e) {
        dispatch(logoutUser())
        localStorage.removeItem('access')
    }


}
