import axios from "axios";
import {
    ACTION_COMMENTS_DEACTIVATE, ACTION_COMMENTS_FAIL,
    ACTION_COMMENTS_SUCCESS,
    ACTION_MOVIES_ADMIN_DEACTIVATE, ACTION_MOVIES_ADMIN_FAIL,
    ACTION_MOVIES_ADMIN_SUCCESS,
    ACTION_MOVIES_FAIL,
    ACTION_MOVIES_SUCCESS,
    LOAD_COMMENTS_FAIL,
    LOAD_COMMENTS_SUCCESS, LOAD_GENRES_FAIL, LOAD_GENRES_SUCCESS, LOAD_MOVIES_ADMIN_SUCCESS,
    LOAD_MOVIES_BYDATE_FAIL,
    LOAD_MOVIES_BYDATE_SUCCESS,
    LOAD_MOVIES_FAIL, LOAD_MOVIES_FINDED, LOAD_MOVIES_FINDED_FAIL,
    LOAD_MOVIES_SUCCESS,
    LOAD_MOVIES_TOP_FAIL,
    LOAD_MOVIES_TOP_SUCCESS,
    LOADING_ACTIVATE,
    LOADING_DEACTIVATE,
    MOVIE_DEACTIVATE,
    NOTIFIACIONS_SUCCESS,
    NOTIFICATION_RESET,
    NOTIFICATIONS_FAILURE
} from "./type";

const _api = process.env.NEXT_PUBLIC_API

export const access = () => {
    return localStorage.getItem('access')
}

export const loadMovies = () => async dispatch => {
    let error = 'Error'
    try {
        await axios.get(`${_api}/movies_general/`,).then(({data}) => {

            dispatch({
                type: LOAD_MOVIES_SUCCESS,
                payload: data
            })
        })
    } catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: LOAD_MOVIES_FAIL,
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

export const loadMoviesRecent = () => async dispatch => {
    let error = 'Error'
    try {
        await axios.get(`${_api}/movies_bydate/`,).then(({data}) => {

            dispatch({
                type: LOAD_MOVIES_BYDATE_SUCCESS,
                payload: data.detail
            })
        })
    } catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: LOAD_MOVIES_FAIL,
            payload: error
        })
        dispatch({
            type: LOAD_MOVIES_BYDATE_FAIL,
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

export const loadMoviesTopRate = () => async dispatch => {
    let error = 'Error'
    try {
        await axios.get(`${_api}/movies_toprating/`,).then(({data}) => {
            dispatch({
                type: LOAD_MOVIES_TOP_SUCCESS,
                payload: data.detail
            })
        })
    } catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: LOAD_MOVIES_TOP_FAIL,
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

export const loadAdminMovies = ()=> async dispatch =>{
    let error = 'Error'
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMDM4NjU1LCJpYXQiOjE2NTEwMDk4NTUsImp0aSI6ImNkZGQ2YjRlNTkwODRiMWZhZTMwNzEwMTE5MTc0YzFjIiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6Ik1hcmlhIiwibGFzdF9uYW1lIjoiU2FudGFuZGVyIiwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJ1c2VyX2ltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuZ2VuZXJhdGVkLnBob3Rvcy9NNUVHbFZBOVZHZkdvTjBYeEZOVkVFU1BVNHRvSGxDM2tnejJnaXZWMURZL3JzOmZpdDoyNTY6MjU2L2N6TTZMeTlwWTI5dWN6Z3UvWjNCb2IzUnZjeTF3Y205ay9MbkJvYjNSdmN5OHdNRGMwL056WTRMbXB3WncuanBnIn0.aoWC3whRlEQ1hBpBD0KVE-DzqaMasfsfm1WutqV7atM'
    const header = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        await axios.get(`${_api}/movies/`,header).then(({data}) => {
            dispatch({
                type: LOAD_MOVIES_ADMIN_SUCCESS,
                payload: data.detail
            })
        })
    } catch (err) {
        if (`${err}` === 'Error: Network Error') {
            error = 'No hay conexión con el servidor'
        } else {
            error = err.response.data.detail
        }

        dispatch({
            type: LOAD_MOVIES_FAIL,
            payload: error
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,
        })

    }
}

export const loadGeneralComments = () => async dispatch => {
    let error = 'Error'
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMDM4NjU1LCJpYXQiOjE2NTEwMDk4NTUsImp0aSI6ImNkZGQ2YjRlNTkwODRiMWZhZTMwNzEwMTE5MTc0YzFjIiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6Ik1hcmlhIiwibGFzdF9uYW1lIjoiU2FudGFuZGVyIiwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJ1c2VyX2ltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuZ2VuZXJhdGVkLnBob3Rvcy9NNUVHbFZBOVZHZkdvTjBYeEZOVkVFU1BVNHRvSGxDM2tnejJnaXZWMURZL3JzOmZpdDoyNTY6MjU2L2N6TTZMeTlwWTI5dWN6Z3UvWjNCb2IzUnZjeTF3Y205ay9MbkJvYjNSdmN5OHdNRGMwL056WTRMbXB3WncuanBnIn0.aoWC3whRlEQ1hBpBD0KVE-DzqaMasfsfm1WutqV7atM'
    const header = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        await axios.get(`${_api}/rating/`, header).then((data) => {

            dispatch({
                type: LOAD_COMMENTS_SUCCESS,
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
            type: LOAD_COMMENTS_FAIL,
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

export const loadLiveSearchMovie = (title) => async dispatch => {
    let error = 'Error'

    if (title) {
        dispatch({
            type: LOADING_ACTIVATE,
        })
        try {
            await axios.get(`${_api}/movie_name/${title}`,).then(({data}) => {
                console.log('The data LOAD', data)
                dispatch({
                    type: LOAD_MOVIES_FINDED,
                    payload: data
                })
                dispatch({
                    type: LOADING_DEACTIVATE,
                })
            })
        } catch (err) {
            if (`${err}` === 'Error: Network Error') {
                error = 'No hay conexión con el servidor'
            } else {
                error = err.response.data.detail
            }

            dispatch({
                type: LOAD_MOVIES_FINDED_FAIL,
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

}

export const loadGenres = () => async dispatch => {
    let error = 'Error'
    try {
        await axios.get(`${_api}/genre/`,).then(({data}) => {
            dispatch({
                type: LOAD_GENRES_SUCCESS,
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
            type: LOAD_GENRES_FAIL,
            payload: error
        })
        dispatch({
            type: NOTIFICATIONS_FAILURE,
            payload: error
        })
        dispatch({
            type: NOTIFICATION_RESET,
        })


    }
}

export const saveRateMovie = ({comment}, raiting, movie, resetForm) => async dispatch => {
    let error = 'Error'
    // const token = access()
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwNTg2Mzg4LCJpYXQiOjE2NTA1NTc1ODgsImp0aSI6ImI1NGVkZjcwZWQ0NTRhNDZhZjc5ZDk3OWYyZjVkMThhIiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6bnVsbCwibGFzdF9uYW1lIjpudWxsLCJpc19zdXBlcnVzZXIiOmZhbHNlLCJ1c2VyX2ltYWdlIjpudWxsfQ.GQxInPTrvEttG8llPQ434NzwK77B-TeBLs9bbQHUHOE'
    dispatch({
        type: LOADING_ACTIVATE,
    })
    const body = JSON.stringify({raiting, movie, comment})

    const header = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        await axios.post(`${_api}/rating/`, body, header).then((data) => {


            if (data.status === 201) {
                dispatch({
                    type: ACTION_MOVIES_SUCCESS,
                    payload: data.statusText
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
                    type: MOVIE_DEACTIVATE
                })
                resetForm()
            } else {
                dispatch({
                    type: ACTION_MOVIES_FAIL,
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
            type: ACTION_MOVIES_FAIL,
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

export const saveMovie = (id, title, release_date, genre, image_banner, image_poster, plot, resetForm) => async dispatch => {
    let error = 'Error'
    // const token = access()

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwODQyOTU2LCJpYXQiOjE2NTA4MTQxNTYsImp0aSI6IjM1NWI2YWIwYThlNjQzNWVhNDI5ODBjMWExZTZkOTg3IiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6Ik1hcmlhIiwibGFzdF9uYW1lIjoiU2FudGFuZGVyIiwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJ1c2VyX2ltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuZ2VuZXJhdGVkLnBob3Rvcy9NNUVHbFZBOVZHZkdvTjBYeEZOVkVFU1BVNHRvSGxDM2tnejJnaXZWMURZL3JzOmZpdDoyNTY6MjU2L2N6TTZMeTlwWTI5dWN6Z3UvWjNCb2IzUnZjeTF3Y205ay9MbkJvYjNSdmN5OHdNRGMwL056WTRMbXB3WncuanBnIn0.WrQDVT2ICXwS6a1TeyPF623BoexPKskoISdk73EZpXQ'
    dispatch({
        type: LOADING_ACTIVATE,
    })
    const body = JSON.stringify({title, release_date, genre, image_banner, image_poster, plot})

    const header = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    if (!id) {
        try {
            await axios.post(`${_api}/movies/`, body, header).then(({data}) => {

                if (!data.error) {
                    dispatch({
                        type: ACTION_MOVIES_ADMIN_SUCCESS,
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'MOVIE SAVED'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: ACTION_MOVIES_ADMIN_DEACTIVATE
                    })
                    resetForm()
                } else {
                    dispatch({
                        type: ACTION_MOVIES_ADMIN_FAIL,
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
                type: ACTION_MOVIES_ADMIN_FAIL,

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

        try {
            await axios.put(`${_api}/movies/${id}/`, body, header).then(({data}) => {

                if (!data.error) {
                    dispatch({
                        type: ACTION_MOVIES_ADMIN_SUCCESS,
                    })

                    dispatch({
                        type: NOTIFIACIONS_SUCCESS,
                        payload: 'UPDATED CORRECTLY'
                    })

                    dispatch({
                        type: LOADING_DEACTIVATE,
                    })

                    dispatch({
                        type: NOTIFICATION_RESET,
                    })

                    dispatch({
                        type: ACTION_MOVIES_ADMIN_DEACTIVATE
                    })
                    resetForm()
                } else {
                    dispatch({
                        type: ACTION_MOVIES_ADMIN_FAIL,
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
                type: ACTION_MOVIES_ADMIN_FAIL,
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

export const deactivateMovie = (id)=> async dispatch =>{
    let error = 'Error'
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMDM4NjU1LCJpYXQiOjE2NTEwMDk4NTUsImp0aSI6ImNkZGQ2YjRlNTkwODRiMWZhZTMwNzEwMTE5MTc0YzFjIiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6Ik1hcmlhIiwibGFzdF9uYW1lIjoiU2FudGFuZGVyIiwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJ1c2VyX2ltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuZ2VuZXJhdGVkLnBob3Rvcy9NNUVHbFZBOVZHZkdvTjBYeEZOVkVFU1BVNHRvSGxDM2tnejJnaXZWMURZL3JzOmZpdDoyNTY6MjU2L2N6TTZMeTlwWTI5dWN6Z3UvWjNCb2IzUnZjeTF3Y205ay9MbkJvYjNSdmN5OHdNRGMwL056WTRMbXB3WncuanBnIn0.aoWC3whRlEQ1hBpBD0KVE-DzqaMasfsfm1WutqV7atM'
    dispatch({
        type: LOADING_ACTIVATE,
    })

    const is_active = {
        'is_active': 0
    }

    const header = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        await axios.patch(`${_api}/movies/disable/${id}/`, is_active, header).then(({data}) => {

            if (!data.error) {
                dispatch({
                    type: ACTION_MOVIES_ADMIN_SUCCESS,
                })

                dispatch({
                    type: NOTIFIACIONS_SUCCESS,
                    payload: 'DEACTIVATED CORRECTLY'
                })

                dispatch({
                    type: LOADING_DEACTIVATE,
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })

                dispatch({
                    type: ACTION_MOVIES_ADMIN_DEACTIVATE
                })

            } else {
                dispatch({
                    type: ACTION_MOVIES_ADMIN_FAIL,
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
            type: ACTION_MOVIES_ADMIN_FAIL,
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

export const deactivateRating = (id)=> async dispatch =>{
    let error = 'Error'
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxMDM4NjU1LCJpYXQiOjE2NTEwMDk4NTUsImp0aSI6ImNkZGQ2YjRlNTkwODRiMWZhZTMwNzEwMTE5MTc0YzFjIiwidXNlcl9pZCI6MiwiZmlyc3RfbmFtZSI6Ik1hcmlhIiwibGFzdF9uYW1lIjoiU2FudGFuZGVyIiwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJ1c2VyX2ltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuZ2VuZXJhdGVkLnBob3Rvcy9NNUVHbFZBOVZHZkdvTjBYeEZOVkVFU1BVNHRvSGxDM2tnejJnaXZWMURZL3JzOmZpdDoyNTY6MjU2L2N6TTZMeTlwWTI5dWN6Z3UvWjNCb2IzUnZjeTF3Y205ay9MbkJvYjNSdmN5OHdNRGMwL056WTRMbXB3WncuanBnIn0.aoWC3whRlEQ1hBpBD0KVE-DzqaMasfsfm1WutqV7atM'
    dispatch({
        type: LOADING_ACTIVATE,
    })

    const is_active = {
        'is_active': 0
    }

    const header = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }

    try {
        await axios.patch(`${_api}/comments/disable/${id}/`, is_active, header).then(({data}) => {


            if (!data.error) {
                dispatch({
                    type: ACTION_COMMENTS_SUCCESS,
                })

                dispatch({
                    type: NOTIFIACIONS_SUCCESS,
                    payload: 'DEACTIVATED CORRECTLY'
                })

                dispatch({
                    type: LOADING_DEACTIVATE,
                })

                dispatch({
                    type: NOTIFICATION_RESET,
                })

                dispatch({
                    type: ACTION_COMMENTS_DEACTIVATE
                })

            } else {
                dispatch({
                    type: ACTION_COMMENTS_FAIL,
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
            type: ACTION_MOVIES_ADMIN_FAIL,
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

