import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import * as action from "../../redux/action/action";
import CardFilm from "./component/CardFilm";
import ModalVideo from "react-modal-video";
import "./HomePage.scss";
import "./scss/typho.scss";
import "./scss/ultility.scss";
import "./scss/amination.scss";

function HomePage(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const {
    listFilmHot,
    listFilmDangChieu,
    listFilmSapChieu,
    currentFilmHot,
  } = props;

  const renderHotFilms = () =>
    props.listFilmHot.map((ele, index) => {
      return <CardFilm key={index} film={ele} />;
    });

  const convertToDate = (dateString) => {
    let date = new Date(dateString + "Z");
    return date.toLocaleDateString();
  };

  useEffect(() => {
    props.callToGetListFilm();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div
          className={
            props.posterHotFilmFade
              ? "header__info-film u-fade--right"
              : "header__info-film"
          }
        >
          <div className="heading-primary u-margin-bottom-small">
            {currentFilmHot.tenPhim}
          </div>
          <div className="heading-sub-title u-inline-block u-margin-right-big">
            {convertToDate(currentFilmHot.ngayKhoiChieu)}
          </div>

          <img
            src={process.env.PUBLIC_URL + "/img/star.png"}
            alt="star"
            className="u-star-small u-margin-right-tiny"
          />
          <div className="heading-sub-title u-inline-block">
            {currentFilmHot.danhGia}
          </div>
        </div>
        <div className="header__poster-hot-film">{renderHotFilms()}</div>
        <div className="header__background-black--left"></div>
        <div className="header__background-black--bottom"></div>
        <div
          className="header__background-img"
          style={{ backgroundImage: `url(${currentFilmHot.hinhAnh})` }}
        ></div>
        <div
          className={
            props.posterHotFilmFade
              ? "header__interact u-fade--right"
              : "header__interact"
          }
        >
          <div className="header__interact-component u-inline-block">
            <img
              src={process.env.PUBLIC_URL + "/img/play.png"}
              alt="play"
              className="header__interact-component__img"
            />
            <button
              className="header__interact-component__btn header__interact-component__btn--orange__black"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <div className="header__interact-component u-inline-block">
            <img
              src={process.env.PUBLIC_URL + "/img/plus.png"}
              alt="plus"
              className="header__interact-component__img"
            />
            <button className="header__interact-component__btn header__interact-component__btn--orange__light" />
          </div>
        </div>
        <div
          className={
            props.posterHotFilmFade
              ? "header__description heading-sub-title u-fade--right"
              : "header__description heading-sub-title"
          }
        >
          {currentFilmHot.moTa}
        </div>
        {!(
          Object.keys(currentFilmHot).length === 0 &&
          currentFilmHot.constructor === Object
        ) ? (
          <ModalVideo channel='youtube' isOpen={isOpen} videoId={currentFilmHot.trailer.slice(currentFilmHot.trailer.lastIndexOf("/") + 1, currentFilmHot.trailer.length)} onClose={() => setIsOpen(false)}/>
        ) : (
          <div />
        )}
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listFilmDangChieu: state.movieReducer.listFilmDangChieu,
    listFilmSapChieu: state.movieReducer.listFilmSapChieu,
    listFilmHot: state.movieReducer.listFilmHot,
    currentFilmHot: state.movieReducer.currentFilmHot,
    isLoading: state.movieReducer.isLoading,
    posterHotFilmFade: state.aminationReducer.posterHotFilmFade,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callToGetListFilm: () => {
      dispatch(action.getListMovieAPI());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
