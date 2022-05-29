import {NOTIFICATION_RESET, NOTIFICATIONS_FAILURE} from "./type";

export const simpleNotification = (message)=> dispatch=> {

    dispatch({
        type: NOTIFICATIONS_FAILURE,
        payload: message
    })
    dispatch({
        type: NOTIFICATION_RESET,
    })


}