import {
    ACTION_MOVIES_FAIL,
    ACTION_MOVIES_SUCCESS,
    LOAD_MOVIES_FAIL,

    LOAD_MOVIES_SUCCESS, MOVIE_DEACTIVATE,

} from "../action/type";

const initialState = {
    movies: null,
    movie_action_success: false
}

export const movieReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_MOVIES_SUCCESS:
            return {
                ...state,
                movies: payload
            }

        case LOAD_MOVIES_FAIL:
            return {
                movies: null,
                movie_action_success: false
            }

        case ACTION_MOVIES_SUCCESS:
            return {
                ...state,
                movie_action_success: true
            }

        case ACTION_MOVIES_FAIL:
            return {
                ...state,
                movie_action_success: false
            }
        case MOVIE_DEACTIVATE:
            return {
                movies: null,
                movie_action_success: false
            }

        default:
            return {
                ...state
            }

    }

}