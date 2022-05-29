import {getAccessToken} from "./auth";

export const access = () => {
    const token = localStorage.getItem('access')
    if(!token)
        getAccessToken()
}