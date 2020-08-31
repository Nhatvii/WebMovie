import React from "react";
import "./LichChieu.scss";
export default function LichChieu(props) {
  const { film } = props;

  const filterLichChieu = (listLichChieu) => {
    return listLichChieu.filter((ele) => {
      return ele.ngayChieuGioChieu.includes("2019-01-02");
    });
  };

  const convertToTime = (dateStr) =>{
    const date = new Date(dateStr + "Z");
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  const renderLichChieu = (listLichChieu) => {
    return filterLichChieu(listLichChieu).map((ele, i) => {
      return (
        <div className="lichChieu__list-time__component" key={i}>
          <div className="lichChieu__list-time__component__time">
            {convertToTime(ele.ngayChieuGioChieu)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="lichChieu">
      <img
        className="lichChieu__img"
        src={film.hinhAnh}
        alt={film.tenPhim}
      ></img>
      <div className="lichChieu__age">
        <div className="lichChieu__age__info">C13</div>
      </div>
      <div className="lichChieu__tenPhim">{film.tenPhim}</div>
      <div className="lichChieu__loai-phim">
        2D Digital
      </div>
      <div className="lichChieu__list-time">
        {renderLichChieu(film.lstLichChieuTheoPhim)}
      </div>
    </div>
  );
}
