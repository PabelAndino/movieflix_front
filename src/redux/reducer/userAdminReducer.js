import {
    LOAD_USERS_DATA_SUCCESS,
    LOAD_USERS_DATA_FAIL,
    ACTION_USERS_SUCCESS,
    ACTION_USERS_FAIL,
    ACTION_USERS_DEACTIVATE

} from "../action/type";

const initialState = {
    user_data: null,
    user_data_action: false
}

export const UserAdminReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_USERS_DATA_SUCCESS:
            return {
                ...state,
                user_data: payload
            }

        case LOAD_USERS_DATA_FAIL:
            return {
                user_data: null,
                user_data_action: false
            }

        case ACTION_USERS_SUCCESS:
            return {
                ...state,
                user_data_action: true
            }

        case ACTION_USERS_FAIL:
            return {
                ...state,
                user_data_action: false
            }
        case ACTION_USERS_DEACTIVATE:
            return {
                user_data: null,
                user_data_action: false
            }

        default:
            return {
                ...state
            }

    }

}