import {
    LOAD_MOVIES_FINDED,
    LOAD_MOVIES_FINDED_FAIL,
    ACTION_MOVIES_FINDED_SUCCESS,
    ACTION_MOVIES_FINDED_FAIL,
    MOVIE_FINDED_DEACTIVATE


} from "../action/type";

const initialState = {
    movies_finded: null,
    movie_find_action: false
}

export const searchingMovieReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_MOVIES_FINDED:
            return {
                ...state,
                movies_finded: payload
            }

        case LOAD_MOVIES_FINDED_FAIL:
            return {
                movies_finded: null,
                movie_find_action: false
            }

        case ACTION_MOVIES_FINDED_SUCCESS:
            return {
                ...state,
                movie_find_action: true
            }

        case ACTION_MOVIES_FINDED_FAIL:
            return {
                ...state,
                movie_find_action: false
            }
        case MOVIE_FINDED_DEACTIVATE:
            return {
                movies_finded: null,
                movie_find_action: false
            }

        default:
            return {
                ...state
            }

    }

}