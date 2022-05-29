import {LOAD_ACCESS_FAIL, LOAD_ACCESS_SUCCESS} from "../action/type";


const initState = {
    access:false
}

export const accessReducer = (state = initState, action) =>{

    const {type, payload} = action

    switch (type) {

        case LOAD_ACCESS_SUCCESS:
            return{
                access:true
            }

        case LOAD_ACCESS_FAIL:
            return {
                access:false
            }

        default:
            return {
                ...state
            }

    }
}