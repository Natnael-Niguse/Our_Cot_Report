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

    const renderSwitch = (param) => {
        switch(param) {
            case '098662':
                return <td>USD</td>;
            case '088691':
                return <td>GOLD</td>;
            case '084691':
                return <td>SILVER</td>;
            case '076651':
                return <td>PLATINUM</td>;
            case '209742':
                return <td>NAS100</td>;
            case '12460+':
                return <td>US30</td>;
            case '13874+':
                return <td>SPX</td>;
            case '067651':
                return <td>USOIL</td>;
            case '043602':
                return <td>US10Y</td>;
            case '133741':
                return <td>BTC</td>;
            case '240743':
                return <td>JP225</td>;
            case '095741':
                return <td>MXN</td>;
            case '232741':
                return <td>AUD</td>;
            case '090741':
                return <td>CAD</td>;
            case '092741':
                return <td>CHF</td>;
            case '096742':
                return <td>GBP</td>;
            case '112741':
                return <td>NZD</td>;
            case '097741':
                return <td>JPY</td>;
            case '099741':
                return <td>EUR</td>;
            default:
                return <td>NONE</td>;
            
        }
    }
      

    const GraphCreate = () => {
        let count = 0;
        return (
            <>
                <div className='container'>
                    <div className='per'>
                        <div>100%</div>
                        <div>80%</div>
                        <div>60%</div>
                        <div>40%</div>
                        <div>20%</div>
                        <div>0%</div>
                    </div>
                    {data !== null && (
                        data.map((itemGroup, index) => (
                            <React.Fragment key={index}>
                                {itemGroup.map((item, i) => {
                                    // Increment the count variable for each iteration of the loop
                                    count++;
                                    const totalPosition = item.noncomm_positions_long_all + item.noncomm_positions_short_all;
                                    const longHeight = (item.noncomm_positions_long_all / totalPosition) * 300 + 'px'; // Set container height (500px) as needed
                                    const shortHeight = 300 - (item.noncomm_positions_long_all / totalPosition) * 300 + 'px'; // Set container height (500px) as needed
                                    const longpercentage = ((item.noncomm_positions_long_all / totalPosition) * 100).toFixed(2);
                                    const shortpercentage = (100 - (longpercentage)).toFixed(2);
                                    const dataLength = data.length;                             
                                    const innercontainerwidth = (100 / dataLength) + '%';

                                    return (
                                        <>
                                            <div className='innercontainer' style={{ width: "3%", margin: '5px' }} key={i}>
                                                <div className='belowbar' style={{ height: shortHeight, backgroundColor: 'rgb(233, 101, 101)' }}>
                                                    {/* <p>{shortpercentage}%</p>*/}
                                                </div>
                                                <div className='abovebar' style={{ height: longHeight, backgroundColor: 'rgb(65, 88, 208)' }}>
                                                    {/*<p>{longpercentage}%</p>*/}
                                                </div>
                                                <p className='barname' style={{ marginTop: count % 2 === 0 ? '0px' : '20px' }}>{renderSwitch(item.cftc_contract_market_code)}</p>
                                            </div>
                                        </>
                                    );

                                })}
                            </React.Fragment>
                        ))
                    )}
                </div>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Asset</th>
                                <th>Long %</th>
                                <th>Long Contracts</th>
                                <th>∆ Long Contracts</th>
                                <th>Short %</th>
                                <th>Short Contracts</th>
                                <th>∆ Short Contracts</th>
                                <th>Net Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data !== null && data.map((itemGroup, index) => (
                                <React.Fragment key={index}>
                                    {itemGroup.map((item, i) => {
                                        const totalPosition = item.noncomm_positions_long_all + item.noncomm_positions_short_all;
                                        const longpercentage = ((item.noncomm_positions_long_all / totalPosition) * 100).toFixed(2);
                                        const shortpercentage = (100 - (longpercentage)).toFixed(2);
                                        const netchange = item.noncomm_positions_long_all - item.noncomm_positions_short_all;
                                        return (
                                            <tr key={i}>
                                            {renderSwitch(item.cftc_contract_market_code)}
                                            {longpercentage > 50 ? (
                                                <td style={{ backgroundColor: 'rgb(65, 88, 208)' }}>{longpercentage + '%'}</td>
                                            ) : (
                                                <td style={{ backgroundColor: 'rgba(65, 89, 208, 0.597)' }}>{longpercentage + '%'}</td>
                                            )}
                                            <td>{item.noncomm_positions_long_all}</td>
                                            <td>{item.change_in_noncomm_long_all}</td>
                                            {shortpercentage > 50 ? (
                                                <td style={{ backgroundColor: 'rgb(233, 101, 101)' }}>{shortpercentage + '%'}</td>
                                            ) : (
                                                <td style={{ backgroundColor: 'rgba(233, 101, 101, 0.658)' }}>{shortpercentage + '%'}</td>
                                            )}
                                            <td>{item.noncomm_positions_short_all}</td>
                                            <td>{item.change_in_noncomm_short_all}</td>
                                            {netchange > 5000 ? (
                                                <td style={{ backgroundColor: 'rgba(65, 89, 208, 0.718)' }}>{netchange}</td>
                                            ) : (
                                                <td style={{ backgroundColor: 'rgba(233, 101, 101, 0.658)' }}>{netchange}</td>
                                            )}
                                        </tr>

                                        )
                                    })}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    return (
        <>
            <HeaderPage />
            <div className="maincontainer">
                <GraphCreate />
            </div>
        </>
    );
}

export default CotsPage;
