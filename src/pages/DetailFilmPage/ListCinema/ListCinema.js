import React, { useState } from 'react';
import "./ListCinema.scss";
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export default function ListCinema(props) {
    const { listCinema } = props;
    const [renderCinema, setRenderCinema] = useState(0);
    return (
        <div className="ListCinema">
            <div className="ListCinema__logo">
                {listCinema.heThongRapChieu?.map((listCinema, index) => {
                    return <a key={index} onClick={() => setRenderCinema(index)}>
                        <img src={listCinema.logo}></img>
                    </a>
                })}
            </div>
            <div className="ListCinema__timeSchedule">
                <div className="ListCinema__timeSchedule__date">
                    {listCinema.heThongRapChieu?.map((ListCinema, index) => {
                        return <div key={index}>
                            {ListCinema.cumRapChieu.map((cinema, index) => {
                                return <div key={index}>
                                    {cinema.lichChieuPhim.map((lichChieu, index) => {
                                        return <div key = {index} className="ListCinema__timeSchedule__date">
                                            <div className="ListCinema__timeSchedule__date">
                                                {moment(lichChieu.ngayChieuGioChieu).format("MM")}
                                                {moment(lichChieu.ngayChieuGioChieu).format("ddd")}
                                            </div>
                                            <div>
                                                {moment(lichChieu.ngayChieuGioChieu).format("DD")}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            })}
                        </div>
                    })}
                </div>
                <div className="ListCinema__timeSchedule__info">
                    {listCinema.heThongRapChieu?.map((ListCinema, index) => {
                        if (index === renderCinema) {
                            return <div id={ListCinema.maHeThongRap}>
                                {ListCinema.cumRapChieu.map((cinema, index) => {
                                    return <div key={index} className="ListCinema__timeSchedule__info__detail" id={cinema.maHeThongRap}>
                                        <div className="ListCinema__timeSchedule__info__detail__info">
                                            <img src={ListCinema.logo}></img>
                                            <div className="ListCinema__timeSchedule__info__detail__info__address">
                                                <div>{cinema.tenCumRap}</div>
                                                <div>{cinema.tenCumRap}</div>
                                            </div>
                                        </div>
                                        <div className="ListCinema__timeSchedule__info__detail__info__format">2d-Digital</div>
                                        <div className="ListCinema__timeSchedule__info__detail__time">
                                            {cinema.lichChieuPhim?.slice(0, 5).map((lichChieu, index) => {
                                                return <NavLink to={`/CheckOutPage/${lichChieu.maLichChieu}`} key={index}>{moment(lichChieu.ngayChieuGioChieu).format("hh:mm")}</NavLink>
                                            })}
                                        </div>
                                    </div>
                                })}
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
