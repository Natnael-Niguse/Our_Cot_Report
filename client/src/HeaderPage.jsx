import React from "react";
import { Link } from 'react-router-dom';
import './Styles.css'

const HeaderPage = () => {
    return(
        <div className="header">
            <div className="logo"></div>
            <div className="navigator">
                <Link to="/">HOME</Link>
                <Link to="#">ABOUT</Link>
                <Link to="CotsPage">CONTRACT</Link>
            </div>
        </div>
    )
}

export default HeaderPage;