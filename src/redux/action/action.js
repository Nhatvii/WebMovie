import * as ActionType from './../constants/ActionType'; 
import Axios from 'axios';

export const getListMovieAPI = () => {
    return (dispatch) => {
        Axios({
            method: "GET", 
            url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP10"
        })
        .then((rs) => {
            dispatch(getListMovie(rs.data));
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const getListCinemaScheduleAPI = (maPhim) => {
    return (dispatch) => {
         Axios({
            method: "GET", 
            url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
            // url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP06"
        }).then((rs) => {
            dispatch(getListCinemaSchedule(rs.data));
        }).catch((err) => {
            console.log(err);
        })
    }
}
export const getListCinemaSchedule = (listCinema) => {
    return {
        type: 'GET_LIST_CINEMA_SCHEDULE',
        data: listCinema
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

export const turnOnTrailerHot = () =>{
    return{
        type: ActionType.TURN_ON_TRAILER_HOT 
    }
}

export const turnOffTrailerHot = () =>{
    return{
        type: ActionType.TURN_OFF_TRAILER_HOT 
    }
}

export const changeTrailer = (trailer) =>{
    return{
        type: ActionType.CHANGE_TRAILER, 
        data: trailer
    }
}