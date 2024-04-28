import React from "react";
import HeaderPage from './HeaderPage';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <div className="banner">
                < HeaderPage />
                <div className="content">
                    <h1>TITANEDGE</h1>
                    <p>signify a company that possesses considerable strength, influence, or prominence in its field and is positioned at the forefront or leading edge of its industry or market.
                         It conveys the idea of being a formidable force with a competitive advantage.</p>
                        <div>
                        <Link to="/CotsPage">
                            <button type="button" className="button">
                                <span></span>COT REPORT
                            </button>
                        </Link>

                            <button type="button"><span></span>HOW TO READ</button>
                        </div>
                </div>

            </div>
        </>
    )
}

export default HomePage;