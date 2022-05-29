import {

    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAIL,
    ACTION_COMMENTS_SUCCESS,
    ACTION_COMMENTS_FAIL,
    ACTION_COMMENTS_DEACTIVATE

} from "../action/type";

const initialState = {
    comments: null,
    comments_action_success: false
}

export const commentsReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOAD_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: payload
            }

        case LOAD_COMMENTS_FAIL:
            return {
                comments: null,
                comments_action_success: false
            }

        case ACTION_COMMENTS_SUCCESS:
            return {
                ...state,
                comments_action_success: true
            }

        case ACTION_COMMENTS_FAIL:
            return {
                ...state,
                comments_action_success: false
            }
        case ACTION_COMMENTS_DEACTIVATE:
            return {
                comments: null,
                comments_action_success: false
            }

        default:
            return {
                ...state
            }

    }

}