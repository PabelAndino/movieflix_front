import {combineReducers} from "redux";

import authReducer from "./authReducer";

import tableReducer from "./tableReducer";
import themeReducer from "./themeReducer";
import utilsReducer from "./utilsReducer";

import {fincaReducer} from "./generalReducer";
import {notificationReducer} from "./notificationReducer";
import {loadingReducer} from "./loadingReducer";
import {userAuthReducer} from "./userAuthReducer";
import {accessReducer} from "./accessReducer";
import {bultosReducer} from "./bultosReducer";
import {updateReducer} from "./updateReducer";
import appReducer from "./appsReducer";
import {movieReducer} from "./movieReducer";
import {moviesByDate} from "./movieByDateReducer";
import {moviesTopRateReducer} from "./movieTopRateReducer";
import {commentsReducer} from "./commentsReducer";
import {UserAdminReducer} from "./userAdminReducer";
import {searchingMovieReducer} from "./searchingMovieReducer";
import {moviesAdminReducer} from "./moviesAdminReducer";
import {genresAdminReducer} from "./genresAdminReducer";

export default combineReducers({
    utils: utilsReducer,
    theme: themeReducer,
    apps: appReducer,
    auth: authReducer,
    table: tableReducer,
    general: fincaReducer,
    notifications: notificationReducer,
    loading: loadingReducer,
    userauth: userAuthReducer,
    access: accessReducer,
    bultos: bultosReducer,
    update_status: updateReducer,

    movies:movieReducer,
    recentMovies:moviesByDate,
    topRateMovie:moviesTopRateReducer,
    commentsGeneral:commentsReducer,

    userAdminReducer:UserAdminReducer,
    moviesFinded:searchingMovieReducer,
    moviesAdmin:moviesAdminReducer,
    genres:genresAdminReducer


});
