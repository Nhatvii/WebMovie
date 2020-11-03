import "./NavBar.scss";
import React from "react";
import { animateScroll } from "react-scroll";
import { Link as LinkDom} from "react-router-dom";

export default function NavBar() {
  var currentLocation = window.location.pathname;
  console.log(currentLocation);
  return (
    <div className="nav">
      <LinkDom to="/" style={{textDecoration: "none"}}>
  <div className="nav__heading">MovieStan</div>
      </LinkDom>
      {currentLocation === "/" ? (
        <div className="nav__link">
          < a
            onClick={() => animateScroll.scrollTo(730)}
          >
            <div className="nav__link__item">Lịch Chiếu</div>
          </a>
          <a
            onClick={() => animateScroll.scrollTo(2000)}
          >
            <div className="nav__link__item">Cụm rạp</div>
          </a>
        </div>
      ) : (
        <div className="nav__link">
          <LinkDom
            to="/"
            onClick={() => animateScroll.scrollTo(730)}
          >
            <div className="nav__link__item">Lịch Chiếu</div>
          </LinkDom>
          <LinkDom
            to="/"
            onClick={() => animateScroll.scrollTo(2000)}

          >
            <div className="nav__link__item">Cụm rạp</div>
          </LinkDom>
        </div>
      )}

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
