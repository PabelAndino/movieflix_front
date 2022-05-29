import {
    ACTION_BULTOS_FAIL,
    ACTION_BULTOS_SUCCESS,
    BULTO_DEACTIVATE,
    LOAD_BULTOS_FAIL,
    LOAD_BULTOS_SUCCESS
} from "../action/type";

const initialState = {
    bultos: null,
    action_bultos_success: false
}

export const bultosReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_BULTOS_SUCCESS:
            return {
                ...state,
                bultos: payload
            }

        case LOAD_BULTOS_FAIL:
            return {
                bultos: null,
                action_bultos_success: false
            }

        case ACTION_BULTOS_SUCCESS:
            return {
                ...state,
                action_bultos_success: true
            }

        case ACTION_BULTOS_FAIL:
            return {
                ...state,
                action_bultos_success: false
            }
        case BULTO_DEACTIVATE:
            return {
                bultos: null,
                action_bultos_success: null
            }

        default:
            return {
                ...state
            }

    }

}