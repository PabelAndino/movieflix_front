import {LOADING_DEACTIVATE,LOADING_ACTIVATE}  from "../action/type";


const initialState = {
    loading : false
}

export const loadingReducer = (state = initialState, action) => {

    const {type, payload} = action

    switch (type) {
        case 'LOADING_ACTIVATE':
            return {
                loading : true
            }

        case 'LOADING_DEACTIVATE':
        return {
            loading : false
        }

        default:
            return state

    }

}