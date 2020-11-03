import React from "react";
import "./CardHotFilm.scss";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import "../scss/amination.scss";
import '../scss/ultility.scss'; 
function CardHotFilm(props) {
  const { hinhAnh, tenPhim, trailer } = props.film;

  return (
    <div
      className= {props.posterHotFilmFade ? "card u-fade--nothing" : "card"}
      onClick={() => {
        props.changeTrailer(trailer);
        props.changeCurrentHotFilm(props.film);
        props.turnOnFadeHotFilm();
      }}
      onAnimationEnd={() => props.turnOffFadeHotFilm()}
    >
      <img src={hinhAnh} alt={tenPhim} className="card__img" />
      <div className="card__name">{tenPhim}</div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentHotFilm: (film) => dispatch(action.changeCurrentHotFilm(film)),
    turnOnFadeHotFilm: () => dispatch(action.turnOnFadeHotFilm()),
    turnOffFadeHotFilm: () => dispatch(action.turnOffFadeHotFilm()),
    changeTrailer: (trailer) =>{
      dispatch(action.changeTrailer(trailer)); 
    }
  };
};

const mapStateToProps = (state) => {
    return {
        posterHotFilmFade: state.aminationReducer.posterHotFilmFade,
        trailer: state.movieReducer.trailer,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardHotFilm);
