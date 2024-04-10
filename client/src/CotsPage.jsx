import React, { useState, useEffect } from 'react';
import HeaderPage from "./HeaderPage";
import './Styles.css'

function CotsPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/cftc_data");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <HeaderPage />
            <div className='tablediv'>
                <table className='tablehead'>
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Long Contracts</th>
                            <th>Short Contracts</th>
                            <th>Change Long</th>
                            <th>Change Short</th>
                            <th>Net Change</th>
                        </tr>
                    </thead>
                    {/* Render a table for each value list */}
                    {Object.keys(data).map((key) => (
                        <tbody key={key}>
                            {data[key].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.market_and_exchange_names}</td>
                                    <td>{item.noncomm_positions_long_all}</td>
                                    <td>{item.noncomm_positions_short_all}</td>
                                    <td>{item.change_in_noncomm_long_all}</td>
                                    <td>{item.change_in_noncomm_short_all}</td>
                                    <td>{item.net_change}</td>
                                </tr>
                            ))}
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    );
}

export default CotsPage;
