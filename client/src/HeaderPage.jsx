import React from "react";
import logo from './Assets/logo.png';
import { Link } from 'react-router-dom';
import './Styles.css'

const HeaderPage = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/" className="logo">
                    <img src={logo} alt="" className="logo"/>
                </Link>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/CotsPage">Cot Reports</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default HeaderPage;
