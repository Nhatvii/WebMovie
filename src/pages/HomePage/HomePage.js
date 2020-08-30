import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import CardHotFilm from "./component/CardHotFilm";
import CardFilm from "./component/CardFilm";
import ModalVideo from "react-modal-video";
import Axios from "axios";
import "./HomePage.scss";
import "./scss/typho.scss";
import "./scss/ultility.scss";
import "./scss/amination.scss";
import Rap from "./component/Rap";
import useDidMountEffect from "./customHook/useDidMountEffect";
import LichChieu from "./component/LichChieu";
function HomePage(props) {
  const [isChosenLeft, setIsChosenLeft] = useState(true);

  const [statusOfCurrentFilm, setStatusOfCurrentFilm] = useState({
    startIndexOfDangChieu: 0,
    startIndexOfSapChieu: 0,
  });

  const [cumRap, setCumRap] = useState({ list: [], maHeThongRap: "" });
  const [listRapTheoHeThongRap, setListRapTheoHeThongRap] = useState({
    list: [],
    active: "",
  });

  const [lichChieu, setLichChieu] = useState([]);

  const {
    listFilmHot,
    listFilmDangChieu,
    listFilmSapChieu,
    currentFilmHot,
  } = props;

  const changeStateActiveRap = (ele) => {
    const listRapTheoHeThongRapTemp = { ...listRapTheoHeThongRap };
    listRapTheoHeThongRapTemp.active = ele;
    setListRapTheoHeThongRap(listRapTheoHeThongRapTemp);
    callGetListLichChieuAPI(cumRap.maHeThongRap, listRapTheoHeThongRap.active);
  };

  async function callGetListRapTheoHeThongRap(maRap) {
    const response = await Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`,
    });
    const listRapTheoHeThongRapTemp = { ...listRapTheoHeThongRap };
    listRapTheoHeThongRapTemp.list = response.data;
    listRapTheoHeThongRapTemp.active = response.data[0].maCumRap;
    setListRapTheoHeThongRap(listRapTheoHeThongRapTemp);
  }

  const callGetListLichChieuAPI = async (maHeThongRap, maCumRap) => {
    const response = await Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP06`,
    });

    const list = [...response.data[0].lstCumRap];
    let lichChieuTemp = [];
    for(let i = 0; i < list.length ; i++){
      if(list[i].maCumRap === maCumRap){
        lichChieuTemp = [...list[i].danhSachPhim];
      }
    }
    setLichChieu(lichChieuTemp);
  };

  const renderLichChieu = () =>{
    return lichChieu.map((ele, index) =>{
      return <LichChieu film = {ele} key = {index}/>
    })
  }

  const renderHotFilms = () => {
    return listFilmHot.map((ele, index) => {
      return <CardHotFilm film={ele} key={index} />;
    });
  };

  const renderCumRap = () => {
    return cumRap.list.map((ele, index) => {
      return (
        <div
          className={
            ele.maHeThongRap === cumRap.maHeThongRap
              ? "section-list-theatre__table__list-cum-rap__component section-list-theatre__table__list-cum-rap__component--active"
              : "section-list-theatre__table__list-cum-rap__component"
          }
          key={index}
          onClick={() => {
            callGetListRapTheoHeThongRap(ele.maHeThongRap);
            const cumRapTemp = { ...cumRap };
            cumRapTemp.maHeThongRap = ele.maHeThongRap;
            setCumRap(cumRapTemp);
          }}
        >
          <img
            src={ele.logo}
            alt={ele.tenHeThongRap}
            className="section-list-theatre__table__list-cum-rap__component__img"
          />
        </div>
      );
    });
  };

  const renderCacRapTheoCumRap = () => {
    return listRapTheoHeThongRap.list.map((ele, index) => {
      return (
        <Rap
          rap={ele}
          key={index}
          active={ele.maCumRap === listRapTheoHeThongRap.active ? "active" : ""}
          functionPass={changeStateActiveRap}
        />
      );
    });
  };

  const renderFilmShow = (startIndex, isDangChieu, numberEle) => {
    let array = [];
    if (isDangChieu) {
      array = [...listFilmDangChieu];
    } else {
      array = [...listFilmSapChieu];
    }

    let arrayResult = [];

    if (array.length > 0) {
      for (let i = startIndex; i < startIndex + numberEle; i++) {
        if (i === array.length) break;
        arrayResult.push(<CardFilm film={array[i]} key={i} />);
      }
    }

    return arrayResult;
  };

  const convertToDate = (dateString) => {
    let date = new Date(dateString + "Z");
    return date.toLocaleDateString();
  };

  const swipeLeftListFilm = (numberEle) => {
    let obj = { ...statusOfCurrentFilm };

    if (isChosenLeft) {
      if (obj.startIndexOfDangChieu === 0) {
        let remain = listFilmDangChieu.length % numberEle;
        if (remain === 0) {
          obj.startIndexOfDangChieu = listFilmDangChieu.length - numberEle;
        } else {
          obj.startIndexOfDangChieu = listFilmDangChieu.length - remain;
        }
        setStatusOfCurrentFilm(obj);
      } else {
        obj.startIndexOfDangChieu -= numberEle;
        setStatusOfCurrentFilm(obj);
      }
    } else {
      if (obj.startIndexOfSapChieu < 0) {
        let remain = listFilmSapChieu.length % numberEle;
        if (remain === 0) {
          obj.startIndexOfSapChieu = listFilmSapChieu.length - numberEle;
        } else {
          obj.startIndexOfSapChieu = listFilmSapChieu.length - remain;
        }
        setStatusOfCurrentFilm(obj);
      } else {
        obj.startIndexOfSapChieu -= numberEle;
        setStatusOfCurrentFilm(obj);
      }
    }
  };

  const swipeRightListFilm = (numberEle) => {
    let obj = { ...statusOfCurrentFilm };

    if (isChosenLeft) {
      if (obj.startIndexOfDangChieu + numberEle >= listFilmDangChieu.length) {
        obj.startIndexOfDangChieu = 0;
        setStatusOfCurrentFilm(obj);
      } else {
        obj.startIndexOfDangChieu += numberEle;
        setStatusOfCurrentFilm(obj);
      }
    } else {
      if (obj.startIndexOfSapChieu + numberEle >= listFilmSapChieu.length) {
        obj.startIndexOfSapChieu = 0;
        setStatusOfCurrentFilm(obj);
      } else {
        obj.startIndexOfSapChieu += numberEle;
        setStatusOfCurrentFilm(obj);
      }
    }
  };

  useDidMountEffect(() => {
    callGetListRapTheoHeThongRap(cumRap.list[0].maHeThongRap);
  }, [cumRap.list]);

  useDidMountEffect(() =>{
    callGetListLichChieuAPI(cumRap.maHeThongRap, listRapTheoHeThongRap.list[0].maCumRap); 
  }, [listRapTheoHeThongRap.list])

  useEffect(() => {
    props.callToGetListFilm();
    async function callApiHeThongRap() {
      const response = await Axios({
        method: "GET",
        url:
          "http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      });

      const listRap = { ...cumRap };
      listRap.list = response.data;
      listRap.maHeThongRap = listRap.list[0].maHeThongRap;
      await setCumRap(listRap);
    }

    callApiHeThongRap();
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
              onClick={() => {
                props.changeTrailer(currentFilmHot.trailer);
                props.turnOnTrailerHot();
              }}
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
          <ModalVideo
            channel="youtube"
            isOpen={props.isOpenHot}
            videoId={props.trailer.slice(
              props.trailer.lastIndexOf("/") + 1,
              props.trailer.length
            )}
            onClose={() => props.turnOffTrailerHot()}
          />
        ) : (
          <div />
        )}
      </header>
      <section className="section-list-film">
        <div className="section-list-film__category">
          <div
            className={
              isChosenLeft
                ? "section-list-film__category__component section-list-film__category__component--active u-inline-block"
                : "section-list-film__category__component u-inline-block"
            }
            onClick={() => setIsChosenLeft(true)}
          >
            Đang Chiếu
            {isChosenLeft ? (
              <div className="section-list-film__category__component__line" />
            ) : (
              <div />
            )}
          </div>
          <div
            className={
              !isChosenLeft
                ? "section-list-film__category__component section-list-film__category__component--active u-inline-block"
                : "section-list-film__category__component u-inline-block"
            }
            onClick={() => setIsChosenLeft(false)}
          >
            Sắp chiếu
            {!isChosenLeft ? (
              <div className="section-list-film__category__component__line" />
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="section-list-film__list">
          {renderFilmShow(
            isChosenLeft
              ? statusOfCurrentFilm.startIndexOfDangChieu
              : statusOfCurrentFilm.startIndexOfSapChieu,
            isChosenLeft,
            6
          )}
        </div>
        <img
          className="section-list-film__arrowLeft"
          src={process.env.PUBLIC_URL + "/img/arrowLeft.png"}
          alt="arrowLeft"
          onClick={() => {
            swipeLeftListFilm(6);
          }}
        ></img>
        <img
          className="section-list-film__arrowRight"
          src={process.env.PUBLIC_URL + "/img/arrowRight.png"}
          alt="arrowRight"
          onClick={() => {
            swipeRightListFilm(6);
          }}
        ></img>
      </section>
      <section className="section-list-theatre">
        <div className="section-list-theatre__heading">
          Lịch chiếu rạp hôm nay
        </div>

        <div className="section-list-theatre__table">
          <div className="section-list-theatre__table__list-cum-rap">
            {renderCumRap()}
          </div>
          <div className="section-list-theatre__table__list-rap">
            {renderCacRapTheoCumRap()}
          </div>
          <div className="section-list-theatre__table__list-lichChieu">
            {renderLichChieu()}
          </div>
        </div>
      </section>
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
    isOpenHot: state.movieReducer.isOpenHot,
    trailer: state.movieReducer.trailer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callToGetListFilm: () => {
      dispatch(action.getListMovieAPI());
    },

    turnOnTrailerHot: () => {
      dispatch(action.turnOnTrailerHot());
    },

    turnOffTrailerHot: () => {
      dispatch(action.turnOffTrailerHot());
    },

    changeTrailer: (trailer) => {
      dispatch(action.changeTrailer(trailer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
