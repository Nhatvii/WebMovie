import React from "react";
import "./LichChieu.scss";
export default function LichChieu(props) {
  const { film } = props;

    const renderLichChieu = (listLichChieu) =>{
        return listLichChieu.map((ele, i) =>{
            return <div className="lichChieu__list-time__component" key={i}>
                <div className="lichChieu__list-time__component__time">{ele.ngayChieuGioChieu}</div>
            </div>
        })
    }

  return (
    <div className="lichChieu">
      <img
        className="lichChieu__img"
        src={film.hinhAnh}
        alt={film.tenPhim}
      ></img>
      <div className="lichChieu__age">C13</div>
      <div className="lichChieu__tenPhim">{film.tenPhim}</div>
      <div className="lichChieu__list-time">
          {renderLichChieu(film.lstLichChieuTheoPhim)}
      </div>
    </div>
  );
}
