import {

    LOAD_MOVIES_TOP_SUCCESS,
    LOAD_MOVIES_TOP_FAIL,
    ACTION_MOVIES_TOP_SUCCESS,
    ACTION_MOVIES_TOP_FAIL,
    MOVIE_TOP_DEACTIVATE,

} from "../action/type";

const initialState = {
    moviesTopRate: null,
    movie_toprate_success: false
}

export const moviesTopRateReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_MOVIES_TOP_SUCCESS:
            return {
                ...state,
                moviesTopRate: payload
            }

        case LOAD_MOVIES_TOP_FAIL:
            return {
                moviesTopRate: null,
                movie_toprate_success: false
            }

        case ACTION_MOVIES_TOP_SUCCESS:
            return {
                ...state,
                movie_toprate_success: true
            }

        case ACTION_MOVIES_TOP_FAIL:
            return {
                ...state,
                movie_toprate_success: false
            }
        case MOVIE_TOP_DEACTIVATE:
            return {
                moviesTopRate: null,
                movie_toprate_success: false
            }

        default:
            return {
                ...state
            }

    }

}