import "./NavBar.scss";
import React, { useEffect } from "react";
import { goToAnchor } from 'react-scrollable-anchor';

export default function NavBar() {


  return (
    <div className="nav">
      <div className="nav__heading">Moviestan</div>

      <div className="nav__link">
        <div className="nav__link__item" onClick = {() => goToAnchor("list-film")}>Lịch Chiếu</div>

        <div className="nav__link__item" onClick = {() => goToAnchor('list-theatre')}>Cụm rạp</div>
      </div>
      <div className="nav__log-in">
        <img
          alt="avatar"
          src={process.env.PUBLIC_URL + "/img/account.png"}
          className="nav__log-in__img"
        ></img>
        <div className="nav__log-in__name">Đăng nhập</div>
      </div>
    </div>
  );
}
