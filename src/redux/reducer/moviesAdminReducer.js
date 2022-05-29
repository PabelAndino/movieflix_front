import {
    LOAD_MOVIES_ADMIN_SUCCESS,
    LOAD_MOVIES_ADMIN_FAIL,
    ACTION_MOVIES_ADMIN_SUCCESS,
    ACTION_MOVIES_ADMIN_FAIL,
    ACTION_MOVIES_ADMIN_DEACTIVATE

} from "../action/type";

const initialState = {
    movies_admin: null,
    movies_admin_action: false
}

export const moviesAdminReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_MOVIES_ADMIN_SUCCESS:
            return {
                ...state,
                movies_admin: payload
            }

        case LOAD_MOVIES_ADMIN_FAIL:
            return {
                movies_admin: null,
                movies_admin_action: false
            }

        case ACTION_MOVIES_ADMIN_SUCCESS:
            return {
                ...state,
                movies_admin_action: true
            }

        case ACTION_MOVIES_ADMIN_FAIL:
            return {
                ...state,
                movies_admin_action: false
            }
        case ACTION_MOVIES_ADMIN_DEACTIVATE:
            return {
                movies_admin: null,
                movies_admin_action: false
            }

        default:
            return {
                ...state
            }

    }

}