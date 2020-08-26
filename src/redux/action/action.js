import * as ActionType from './../constants/ActionType'; 
import Axios from 'axios';

export const getListMovieAPI = () => {
    return (dispatch) => {
        Axios({
            method: "GET", 
            url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP04"
        })
        .then((rs) => {
            dispatch(getListMovie(rs.data));
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const getListMovie = (listMovie) => {
    return {
        type: ActionType.GET_LIST_FILM, 
        data: listMovie
    }
}

export const changeCurrentHotFilm = (film) => {
    return{
        type: ActionType.CHANGE_CURRENT_HOT_FILM,
        data: film
    }
}

export const turnOnFadeHotFilm = () =>{
    return{
        type: ActionType.TURN_ON_FADE_POSTER_HOT_FILM
    }
}

export const turnOffFadeHotFilm = () =>{
    return{
        type: ActionType.TURN_OFF_FADE_POSTER_HOT_FILM
    }
}