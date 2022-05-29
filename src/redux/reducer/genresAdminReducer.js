import {
    LOAD_GENRES_SUCCESS,
    LOAD_GENRES_FAIL,
    ACTION_GENRES_SUCCESS,
    ACTION_GENRES_FAIL,
    ACTION_GENRES_DEACTIVATE

} from "../action/type";

const initialState = {
    genres: null,
    genres_admin_action: false
}

export const genresAdminReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_GENRES_SUCCESS:
            return {
                ...state,
                genres: payload
            }

        case LOAD_GENRES_FAIL:
            return {
                genres: null,
                genres_admin_action: false
            }

        case ACTION_GENRES_SUCCESS:
            return {
                ...state,
                genres_admin_action: true
            }

        case ACTION_GENRES_FAIL:
            return {
                ...state,
                genres_admin_action: false
            }
        case ACTION_GENRES_DEACTIVATE:
            return {
                genres: null,
                genres_admin_action: false
            }

        default:
            return {
                ...state
            }

    }

}