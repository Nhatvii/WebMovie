import "./Rap.scss";
import React from "react";

export default function Rap(props) {
  const { tenCumRap, diaChi, maCumRap } = props.rap;

  function getImage() {
    if (tenCumRap.includes("CGV")) {
      return "/img/rapCGV.png";
    } else if (tenCumRap.includes("BHD Star")) {
      return "/img/bhdCinema.jpg";
    } else if (tenCumRap.includes("CNS")) {
      return "/img/movieStarCinema.jpg";
    } else if (tenCumRap.includes("GLX")) {
      return "/img/galaxyCinema.jpg";
    } else if (tenCumRap.includes("Lotte")) {
      return "/img/lottoCinema.jpg";
    } else if (tenCumRap.includes("MegaGS")) {
      return "/img/megaCinema.jpg";
    }
  }

  return (
    <div
      className={props.active === "active" ? "rap rap--active" : "rap"}
      onClick={() => {
        props.functionPass(maCumRap)}}
    >
      <img
        src={process.env.PUBLIC_URL + getImage()}
        alt={tenCumRap}
        className="rap__hinh"
      />
      <div className="rap__info">
        <div className="rap__info__ten">{tenCumRap}</div>
        <div className="rap__info__dia-chi">{diaChi}</div>
      </div>
    </div>
  );
}
