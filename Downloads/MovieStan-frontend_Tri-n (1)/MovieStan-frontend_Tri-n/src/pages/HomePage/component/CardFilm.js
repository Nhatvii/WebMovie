import React from "react";
import "./CardFilm.scss";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { Link } from "react-router-dom";

function CardFilm(props) {
  const { film } = props;

  const convertToDate = (dateString) => {
    let date = new Date(dateString + "Z");
    return date.toLocaleDateString();
  };

  return (
    <div className="card-film">
      <div className="card-film-side card-film--back">
        <div
          className="card-film--back__play"
          onClick={() => {
            props.changeTrailer(film.trailer);
            props.turnOnTrailer();
          }}
        >
          <img
            className="card-film--back__play__img"
            src={process.env.PUBLIC_URL + "/img/playCircle.png"}
            alt="play"
          />
        </div>
        <Link to={`${film.maPhim}`}>
          <button className="card-film--back__btn">Đặt vé</button>
        </Link>
      </div>
      <div className="card-film-side card-film--front">
        <img
          className="card-film--front__hinhAnh"
          src={film.hinhAnh}
          alt={film.tenPhim}
        />
        <div className="card-film--front__rule-age">
          <div className="card-film--front__rule-age__info">C13</div>
        </div>
        <div className="card-film--front__rating">
          <img
            src={process.env.PUBLIC_URL + "/img/star.png"}
            alt="star"
            className="card-film--front__rating__star u-inline-block"
          />
          <div className="card-film--front__rating__info u-inline-block">
            {film.danhGia}
          </div>
        </div>

        <div className="card-film--front__info">
          <div className="card-film--front__info__tenPhim heading-sub-title--black">
            {film.tenPhim}
          </div>
          <div className="card-film--front__info__ngayKhoiChieu">
            {convertToDate(film.ngayKhoiChieu)}
          </div>
          <div className="card-film--front__info__thoiLuong">69:69</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.movieReducer.isOpenHot,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    turnOffTrailer: () => {
      dispatch(action.turnOffTrailerHot());
    },
    turnOnTrailer: () => {
      dispatch(action.turnOnTrailerHot());
    },
    changeTrailer: (trailer) => {
      dispatch(action.changeTrailer(trailer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardFilm);
