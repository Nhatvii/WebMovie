import React from "react";
import "./AboutUsPage.scss";
export default function AboutUsPage(props) {
  return (
    <div className="container--aboutUs">
      <div className="container--aboutUs--team">
        <div className="container--aboutUs--team__welcome">Meet our team</div>

        <div className="info">
          <div className="card__about-us">
            <div className="card__about-us__side card__about-us__side--front">
              <h4 className="card__about-us__heading">Back End</h4>
            </div>
            <div className="card__about-us__side card__about-us__side--back">
              <div className="card__about-us__info">
                <div className="card__about-us__info__name">Tran Nhu Kien</div>
                <div className="card__about-us__info__name">Nguyen Dang Khoa</div>
              </div>
            </div>
          </div>

          <div className="card__about-us">
            <div className="card__about-us__side card__about-us__side--front">
              <h4 className="card__about-us__heading">Front End</h4>
            </div>
            <div className="card__about-us__side card__about-us__side--back">
              <div className="card__about-us__info">
                <div className="card__about-us__info__name">Hong Kien Trien</div>
                <div className="card__about-us__info__name">Tran Nhat Vi</div>
              </div>
            </div>
          </div>
        </div>
      
        <img className="btn--exit" src={process.env.PUBLIC_URL + "/img/btnExit.png"} onClick={() => props.history.goBack()} alt="exit"></img>
      </div>
    </div>
  );
}
