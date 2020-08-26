import React from "react";
import "./CardFilm.scss";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import "../scss/amination.scss";
import '../scss/ultility.scss'; 
function CardFilm(props) {
  const { hinhAnh, tenPhim } = props.film;

  return (
    <div
      className= {props.posterHotFilmFade ? "card u-fade--nothing" : "card"}
      onClick={() => {
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
  };
};

const mapStateToProps = (state) => {
    return {
        posterHotFilmFade: state.aminationReducer.posterHotFilmFade
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardFilm);
