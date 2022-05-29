import {
    ACTION_MOVIES_BYDATE_FAIL, ACTION_MOVIES_BYDATE_SUCCESS, LOAD_MOVIES_BYDATE_FAIL, LOAD_MOVIES_BYDATE_SUCCESS,
    MOVIE_BYDATE_DEACTIVATE


} from "../action/type";

const initialState = {
    moviesByDate: null,
    movie_action_success: false
}

export const moviesByDate = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_MOVIES_BYDATE_SUCCESS:
            return {
                ...state,
                moviesByDate: payload
            }

        case LOAD_MOVIES_BYDATE_FAIL:
            return {
                moviesByDate: null,
                movie_action_success: false
            }

        case ACTION_MOVIES_BYDATE_SUCCESS:
            return {
                ...state,
                movie_action_success: true
            }

        case ACTION_MOVIES_BYDATE_FAIL:
            return {
                ...state,
                movie_action_success: false
            }
        case MOVIE_BYDATE_DEACTIVATE:
            return {
                moviesByDate: null,
                movie_action_success: false
            }

        default:
            return {
                ...state
            }

    }

}