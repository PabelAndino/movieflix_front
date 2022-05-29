import axios from "axios";
import {
    ACTION_MOVIES_FAIL,
    ACTION_MOVIES_SUCCESS, ACTION_USERS_DEACTIVATE, ACTION_USERS_FAIL, ACTION_USERS_SUCCESS,
    LOAD_COMMENTS_FAIL,
    LOAD_COMMENTS_SUCCESS, LOAD_USERS_DATA_FAIL, LOAD_USERS_DATA_SUCCESS, LOADING_ACTIVATE,
    LOADING_DEACTIVATE, MOVIE_DEACTIVATE, NOTIFIACIONS_SUCCESS,
    NOTIFICATION_RESET,
    NOTIFICATIONS_FAILURE
} from "./type";
const _api = process.env.NEXT_PUBLIC_API

export const access = () => {
    return localStorage.getItem('access')
}

export const loadDetailsUser = () => async dispatch =>{
    let error = 'Error'
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMDM4NjU1LCJpYXQiOjE2NTEwMDk4NTUsImp0aSI6ImNkZGQ2YjRlNTkwODRiMWZhZTMwNzEwMTE5MTc0YzFjIiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6Ik1hcmlhIiwibGFzdF9uYW1lIjoiU2FudGFuZGVyIiwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJ1c2VyX2ltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuZ2VuZXJhdGVkLnBob3Rvcy9NNUVHbFZBOVZHZkdvTjBYeEZOVkVFU1BVNHRvSGxDM2tnejJnaXZWMURZL3JzOmZpdDoyNTY6MjU2L2N6TTZMeTlwWTI5dWN6Z3UvWjNCb2IzUnZjeTF3Y205ay9MbkJvYjNSdmN5OHdNRGMwL056WTRMbXB3WncuanBnIn0.aoWC3whRlEQ1hBpBD0KVE-DzqaMasfsfm1WutqV7atM'

    const header = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        await axios.get(`${_api}/manage_user/`,header).then(({data}) => {

            dispatch({
                type: LOAD_USERS_DATA_SUCCESS,
                payload: data.data
            })
            dispatch({
                type: LOADING_DEACTIVATE,
            })
        })
    } catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err
        }

        console.log(err)
        dispatch({
            type: LOAD_USERS_DATA_FAIL,
            payload: error
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: `SOMETHING WENT WRONG AT LOAD: ${(err)}`
        })
        dispatch({
            type: NOTIFICATION_RESET,
        })
        dispatch({
            type: LOADING_DEACTIVATE,
        })

    }
}

export const manageUserDetail = (id,username,first_name,last_name,email,is_superuser,password,user_image,resetForm) => async dispatch =>{
    let error = 'Error'
    // const token = access()
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwNzcyODA1LCJpYXQiOjE2NTA3NDQwMDUsImp0aSI6IjNlZmZjYmIwMjQ0ZjQ1MTZhZmJiMjJjZTFlZDM1NDhkIiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6bnVsbCwibGFzdF9uYW1lIjpudWxsLCJpc19zdXBlcnVzZXIiOnRydWUsInVzZXJfaW1hZ2UiOiJodHRwczovL2ltYWdlcy5nZW5lcmF0ZWQucGhvdG9zL001RUdsVkE5VkdmR29OMFh4Rk5WRUVTUFU0dG9IbEMza2d6MmdpdlYxRFkvcnM6Zml0OjI1NjoyNTYvY3pNNkx5OXBZMjl1Y3pndS9aM0JvYjNSdmN5MXdjbTlrL0xuQm9iM1J2Y3k4d01EYzAvTnpZNExtcHdady5qcGcifQ.K1PxeVzrs-2EfTD7bzNmZ8pzyn0fHbZAFszN3mnmVcY'
    dispatch({
        type: LOADING_ACTIVATE,
    })
    const body = JSON.stringify({username, first_name, last_name,email,is_superuser,user_image})
    const body_to_save = JSON.stringify({username, first_name, last_name,email,is_superuser,password,user_image})
    const header = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    if(id){
        try {
            await axios.put(`${_api}/manage_user/${id}/`, body, header).then(({data}) => {

                if (!data.error) {
                    dispatch({
                        type: ACTION_USERS_SUCCESS,
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'THANKS FOR THE REVIEW'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: ACTION_USERS_DEACTIVATE
                    })
                    resetForm()
                } else {
                    dispatch({
                        type: ACTION_USERS_FAIL,
                        payload: `SOMETHING WENT WRONG: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `SOMETHING WENT WRONG AT SAVE: ${JSON.stringify(data.detail)}`
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
                error = 'THERES NO SERVER NETWORK CONNECTION'
            } else {
                error = err.response.data.detail

            }

            dispatch({
                type: ACTION_USERS_FAIL,
                payload: 'AN ERROR OCCURRED'
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
        try {
            await axios.post(`${_api}/manage_user/`, body_to_save, header).then(({data}) => {
                if (!data.error) {
                    dispatch({
                        type: ACTION_USERS_SUCCESS,
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'THANKS FOR THE REVIEW'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: ACTION_USERS_DEACTIVATE
                    })
                    resetForm()
                } else {
                    dispatch({
                        type: ACTION_USERS_FAIL,
                        payload: `SOMETHING WENT WRONG: ${JSON.stringify(data.details)}`
                    })
                    dispatch({
                        type: NOTIFICATIONS_FAILURE,
                        payload: `SOMETHING WENT WRONG AT SAVE: ${JSON.stringify(data.detail)}`
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
                error = 'THERES NO SERVER NETWORK CONNECTION'
            } else {
                error = err.response.data.detail

            }

            dispatch({
                type: ACTION_USERS_FAIL,
                payload: 'AN ERROR OCCURRED'
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

export const disableUser = (id, resetForm) =>async dispatch => {
    let error = 'Error'
    // const token = access()
    const is_active = 0
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMDM4NjU1LCJpYXQiOjE2NTEwMDk4NTUsImp0aSI6ImNkZGQ2YjRlNTkwODRiMWZhZTMwNzEwMTE5MTc0YzFjIiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6Ik1hcmlhIiwibGFzdF9uYW1lIjoiU2FudGFuZGVyIiwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJ1c2VyX2ltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuZ2VuZXJhdGVkLnBob3Rvcy9NNUVHbFZBOVZHZkdvTjBYeEZOVkVFU1BVNHRvSGxDM2tnejJnaXZWMURZL3JzOmZpdDoyNTY6MjU2L2N6TTZMeTlwWTI5dWN6Z3UvWjNCb2IzUnZjeTF3Y205ay9MbkJvYjNSdmN5OHdNRGMwL056WTRMbXB3WncuanBnIn0.aoWC3whRlEQ1hBpBD0KVE-DzqaMasfsfm1WutqV7atM'
    dispatch({
        type: LOADING_ACTIVATE,
    })
    const body = JSON.stringify({is_active})
    const header = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        await axios.patch(`${_api}/manage_user/disable/${id}/`, body, header).then(({data}) => {

            if (!data.Error) {
                dispatch({
                    type: ACTION_USERS_SUCCESS,
                })

                dispatch({
                    type: NOTIFIACIONS_SUCCESS,
                    payload: 'Desactivated correctly'
                })

                dispatch({
                    type: LOADING_DEACTIVATE,
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })

                dispatch({
                    type: ACTION_USERS_DEACTIVATE
                })
                resetForm()
            } else {
                dispatch({
                    type: ACTION_USERS_FAIL,
                    payload: `SOMETHING WENT WRONG: ${JSON.stringify(data.details)}`
                })
                dispatch({
                    type: NOTIFICATIONS_FAILURE,
                    payload: `SOMETHING WENT WRONG AT SAVE: ${JSON.stringify(data.detail)}`
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
        console.log(err)
        if (`${err}` === 'Error: Network Error') {
            error = 'THERES NO SERVER NETWORK CONNECTION'
        } else {
            error = err.response.data.detail

        }

        dispatch({
            type: ACTION_USERS_FAIL,
            payload: 'AN ERROR OCCURRED'
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
