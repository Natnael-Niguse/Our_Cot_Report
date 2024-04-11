import React, { useState, useEffect } from 'react';
import HeaderPage from "./HeaderPage";
import './Styles.css';

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
            setData(Object.values(data));
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const GraphCreate = () => {
        return (
            <>
            <div className='container'>
                {data !== null && (
                    data.map((itemGroup, index) => (
                        <div className='' key={index}>
                            {itemGroup.map((item, i) => {
                                const totalPosition = item.noncomm_positions_long_all + item.noncomm_positions_short_all;
                                const longHeight = (item.noncomm_positions_long_all / totalPosition) * 500 + 'px'; // Set container height (500px) as needed
                                const shortHeight = 500 - (item.noncomm_positions_long_all / totalPosition) * 500 + 'px'; // Set container height (500px) as needed
                                const longpercentage = ((item.noncomm_positions_long_all / totalPosition) * 100).toFixed(2);
                                const shortpercentage = (100 - (longpercentage)).toFixed(2);
                                return (
                                    <>
                                    <div className='innercontainer' key={i}>
                                        <div className='abovebar' style={{ height: longHeight, width: '50px', backgroundColor: '#f8596a' }}>
                                            <p>{longpercentage}%</p>
                                        </div>
                                        <div className='belowbar' style={{ height: shortHeight, width: '50px', backgroundColor: '#0074db' }}>
                                        <p>{shortpercentage}%</p>
                                        </div>
                                        {/* Add more elements here based on your data */}
                                    </div>
                                    <p>this</p>
                                    </>   
                                );
                            })}
                        </div>
                    ))
                )}
            </div>
            <div className='table'>
            <table>
                <thead>
                    <tr>
                        <th>Asset</th>
                        <th>All Long</th>
                        <th>All Short</th>
                        <th>Net Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                        <td>Data 4</td>
                    </tr>
                    <tr>
                        <td>Data 5</td>
                        <td>Data 6</td>
                        <td>Data 7</td>
                        <td>Data 8</td>
                    </tr>
                </tbody>
            </table>
            </div>
            </>
        );
    };
     
    
    return (
        <>
            <HeaderPage />
            <div id="container">
                {GraphCreate()}
            </div>
        </>
    );
}

export default CotsPage;
