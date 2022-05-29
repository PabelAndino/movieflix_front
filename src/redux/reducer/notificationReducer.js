import {NOTIFIACIONS_SUCCESS,NOTIFICATIONS_FAILURE, NOTIFICATION_RESET} from "../action/type";

const initialState = {

    notification:false,
    message:null,
    type:null

}

export const notificationReducer = (state=initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case NOTIFIACIONS_SUCCESS:
            return {
                ...state,
                notification: true,
                message: payload,
                type: 'success'
            }

        case NOTIFICATIONS_FAILURE:
            return  {
                ...state,
                notification: true,
                message: payload,
                type: 'fail'
            }

        case NOTIFICATION_RESET:
            return {
                notification: false,
                type: null,
                message: null
            }

        default:
            return state
    }
}