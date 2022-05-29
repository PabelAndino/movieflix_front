import {LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_USER, LOGOUT_USER_FAIL, LOGIN_SUCCESS} from "../action/type";


const authReducer = (state = [] , action) => {
  const { type, payload } = action;
  switch (type) {

    case LOAD_USER_SUCCESS:
      return {
        user: payload,

      }
    case LOGOUT_USER:
      return {
        user : null,
      }

    case LOGOUT_USER_FAIL:
      return {
        ...state
      }
    case LOAD_USER_FAIL:
      return {
        user : null,
      }
    default:
      return state;
  }
};
export default authReducer;
