import "./NavBar.scss";
import React from "react";
import { Link } from "react-scroll";
export default function NavBar() {
  return (
    <div className="nav">
      <div className="nav__heading">Moviestan</div>

      <div className="nav__link">
        <Link
          activeClass="active"
          to="list-film"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          <div className="nav__link__item">Lịch Chiếu</div>
        </Link>
        <Link
          activeClass="active"
          to="list-theatre"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
        <div className="nav__link__item">Cụm rạp</div>
        </Link>
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
