import React, { useEffect, useState } from 'react';
import * as action from "../../redux/action/action";
import { connect } from 'react-redux';
import "./DetailFilmPage.scss";
import ListCinema from './ListCinema/ListCinema';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
function DetailFilmPage(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { listCinemaSchedule } = props;
    useEffect(() => {
        props.callToGetListCinema(1418);
    }, []);
    console.log('thong tin phim', listCinemaSchedule);
    // console.log(listCinemaSchedule.moTa);
    const convertToDate = (dateString) => {
        let date = new Date(dateString + "Z");
        return date.toLocaleDateString();
    };

    // const renderCinemaSchedule = () => {
    //     return <div className="Cinema">
    //         <div className="Cinema__logo">
    //             {listCinemaSchedule.heThongRapChieu?.map((heThongRapChieu, index) => {
    //                 return <a key={index} className="nav-link" aria-selected="true"> <img src={heThongRapChieu.logo}></img></a>
    //             })}
    //         </div>
    //     </div>
    // }
    return (
        <div>
            <div className="Detail__background" style={{ backgroundImage: `url(${listCinemaSchedule.hinhAnh})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover' }}>
                <div className="Detail__description">
                    <div className="Detail__description__background"></div>
                    <img src={listCinemaSchedule.hinhAnh}></img>
                    <div className="Detail__description__info">
                        <p className="Detail__description__info__launch-time">{convertToDate(listCinemaSchedule.ngayKhoiChieu)}</p>
                        <div className="Detail__description__info__movie-name">{listCinemaSchedule.tenPhim}</div>
                        <p className="Detail__description__info__time">120 phút</p>
                        <button className="Detail__description__info__btn-ticket" >Đặt vé</button>
                    </div>
                    <div className="Detail__description__rate">
                        <img src={process.env.PUBLIC_URL + "/img/star.png"}></img>
                        <div>{listCinemaSchedule.danhGia}</div>
                    </div>
                </div>
            </div>


            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={{ backgroundColor: '#FFFF', color: '#F25238'}}>
                        <Tab label="Lịch chiếu" {...a11yProps(0)} />
                        <Tab label="Thông tin" {...a11yProps(1)} />
                        <Tab label="Đánh giá" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <ListCinema listCinema={listCinemaSchedule}></ListCinema>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        listCinemaSchedule: state.movieDetailReducer.listCinemaSchedule,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        callToGetListCinema: (maPhim) => {
            dispatch(action.getListCinemaScheduleAPI(maPhim));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailFilmPage);