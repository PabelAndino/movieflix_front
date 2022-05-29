import {SET_DEFAULT, SET_UPDATE} from "../action/type";

const initialValues = {
    update: false
}


export const updateReducer = (state = initialValues, action) => {

    const {type} = action
    switch (type) {
        case SET_UPDATE:
            return {
                update: true
            }

        case SET_DEFAULT:
            return {
                update: false
            }

        default:
            return {
                ...state
            }

    }

}