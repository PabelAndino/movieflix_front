import {
    LOAD_FINCA_SUCCESS,
    LOAD_FINCA_FAILURE,
    FINCA_FAILURE,
    FINCA_SUCCESS,
    FINCA_DEACTIVATE,
    LOAD_AREA_SUCCESS,
    LOAD_AREA_FAILURE,
    AREA_SUCESS,
    AREA_FAILURE,
    AREA_DEACTIVATE,
    LOAD_PILON_SUCCESS,
    LOAD_PILON_FAILURE,
    PILON_SUCCESS,
    PILON_FAILURE,
    PILON_DEACTIVATE,
    LOAD_CLASES_SUCCESS,
    LOAD_CLASES_FAILURE,
    CLASE_SUCCESS,
    CLASE_FAILURE,
    CLASE_DEACTIVATE,
    LOAD_CORTE_SUCCESS,
    LOAD_CORTE_FAILURE,
    CORTE_SUCCESS,
    CORTE_FAILURE,
    CORTE_DEACTIVATE,
    LOAD_VARIEDAD_SUCCESS, LOAD_VARIEDAD_FAILURE, VARIEDAD_SUCESS, VARIEDAD_FAILURE, VARIEDAD_DEACTIVATE
} from "../action/type";

const initialState = {
    finca: null,
    area: null,
    pilon: null,
    clase: null,
    corte: null,
    variedad: null,
    dataSuccess: false,
    notification: false,
}

export const fincaReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_FINCA_SUCCESS:
            return {
                ...state,
                finca: payload,
                notification: false,

            }
        case LOAD_FINCA_FAILURE:
            return {
                ...state,
                finca: null,
                notification: true,
            }
        case FINCA_SUCCESS:
            return {
                ...state,
                dataSuccess: true,
            }
        case FINCA_FAILURE:
            return {
                ...state,
                dataSuccess: false,
            }
        case FINCA_DEACTIVATE :
            return {
                finca: null,
                dataSuccess: false,
                notification: false,
            }
        case LOAD_AREA_SUCCESS:
            return {
                ...state,
                area: payload,
            }
        case LOAD_AREA_FAILURE:
            return {
                ...state,
                area: null,

            }
        case AREA_SUCESS:
            return {
                ...state,
                dataSuccess: true
            }
        case AREA_FAILURE:
            return {
                ...state,
                dataSuccess: false
            }
        case AREA_DEACTIVATE:
            return {
                ...state,
                area: null,
                dataSuccess: null
            }
        case LOAD_PILON_SUCCESS:
            return {
                ...state,
                pilon: payload
            }
        case LOAD_PILON_FAILURE:
            return {
                ...state,
                pilon: null
            }
        case PILON_SUCCESS:
            return {
                ...state,
                dataSuccess: true
            }
        case PILON_FAILURE:
            return {
                ...state,
                dataSuccess: false
            }
        case PILON_DEACTIVATE:
            return {
                ...state,
                pilon: null,
                dataSuccess: null
            }
        case LOAD_CLASES_SUCCESS:
            return {
                ...state,
                clase: payload
            }
        case LOAD_CLASES_FAILURE:
            return {
                ...state,
                clase: null
            }
        case CLASE_SUCCESS:
            return {
                ...state,
                dataSuccess: true
            }
        case CLASE_FAILURE:
            return {
                ...state,
                dataSuccess: false
            }
        case CLASE_DEACTIVATE:
            return {
                ...state,
                clase: null,
                dataSuccess: null
            }
        case LOAD_CORTE_SUCCESS:
            return {
                ...state,
                corte: payload
            }
        case LOAD_CORTE_FAILURE:
            return {
                ...state,
                corte: null
            }
        case CORTE_SUCCESS:
            return {
                ...state,
                dataSuccess: true
            }
        case CORTE_FAILURE:
            return {
                ...state,
                dataSuccess: false
            }
        case CORTE_DEACTIVATE:
            return {
                ...state,
                corte: null,
                dataSuccess: false
            }
        case LOAD_VARIEDAD_SUCCESS:
            return {
                ...state,
                variedad: payload
            }
        case LOAD_VARIEDAD_FAILURE:
            return {
                ...state,
                variedad: null
            }
        case VARIEDAD_SUCESS:
            return {
                ...state,
                dataSuccess: true
            }
        case VARIEDAD_FAILURE:
            return {
                ...state,
                dataSuccess: false
            }
        case VARIEDAD_DEACTIVATE:
            return {
                ...state,
                variedad: null,
                dataSuccess: false
            }

        default:
            return state

    }
}
