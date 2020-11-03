import React from 'react'
import {Ellipsis} from 'react-spinners-css';
import './LoadingPage.scss';

export default function LoadingPage() {
    return (
        <div className="container-spinner">
            <Ellipsis color="#f25238" size={200} className="container-spinner__icon"/>
            <h4 className="container-spinner__text">Loading page...</h4>
        </div>
    )
}
