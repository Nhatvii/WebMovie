import React from 'react'
import { Link } from "react-router-dom";
import "./Footer.scss";
export default function Footer() {
    return (
        <footer className="footer">
        <Link to="/aboutUs">
          <div className="footer__about-us">About us</div>
        </Link>
        <div className="footer__copyright">
          <img
            className="footer__copyright__img u-inline-block"
            src={process.env.PUBLIC_URL + "/img/copyright.png"}
            alt="copyright"
          ></img>
          <div className="footer__copyright__info u-inline-block">
            Copyright
          </div>
        </div>
      </footer>
    )
}
