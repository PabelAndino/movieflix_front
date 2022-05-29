import {LOGIN_FAILURE, LOGIN_SUCCESS} from "../action/type";


const initialState = {
    login : false,

}


export const  userAuthReducer = (state = initialState, action) => {

    const {type, payload } = action
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                login: true,

            }
        case LOGIN_FAILURE:
            return {
                login: false
            }
        default:
            return {
                ...state
            }


    }

}