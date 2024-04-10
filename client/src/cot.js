import React, { useState, useEffect } from 'react';

function Cots() {
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
        <div>
            {/* Render a table for each value list */}
            {Object.keys(data).map((key) => (
                <div key={key}>
                    <h2>Value List: {key}</h2>
                    <table>
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
                        <tbody>
                            {data[key].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.asset}</td>
                                    <td>{item.long_contracts}</td>
                                    <td>{item.short_contracts}</td>
                                    <td>{item.change_long}</td>
                                    <td>{item.change_short}</td>
                                    <td>{item.net_change}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default Cots;