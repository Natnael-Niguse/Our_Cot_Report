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
            const dataArray = Object.values(data); // Convert object values to array
            const sortedArray = dataArray.sort((a, b) => {
                // Sort in descending order based on noncomm_positions_long_all values
                return b[0].noncomm_positions_long_all - a[0].noncomm_positions_long_all;
            });
            setData(sortedArray);
            console.log(sortedArray);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    
    

    const renderSwitch = (param) => {
        switch(param) {
            case '098662':
                return <td className="currency">USD</td>;
            case '088691':
                return <td className="currency">GOLD</td>;
            case '084691':
                return <td className="currency">SILVER</td>;
            case '076651':
                return <td className="currency">PLATINUM</td>;
            case '209742':
                return <td className="currency">NAS100</td>;
            case '12460+':
                return <td className="currency">US30</td>;
            case '13874+':
                return <td className="currency">SPX</td>;
            case '067651':
                return <td className="currency">USOIL</td>;
            case '043602':
                return <td className="currency">US10Y</td>;
            case '133741':
                return <td className="currency">BTC</td>;
            case '240743':
                return <td className="currency">JP225</td>;
            case '095741':
                return <td className="currency">MXN</td>;
            case '232741':
                return <td className="currency">AUD</td>;
            case '090741':
                return <td className="currency">CAD</td>;
            case '092741':
                return <td className="currency">CHF</td>;
            case '096742':
                return <td className="currency">GBP</td>;
            case '112741':
                return <td className="currency">NZD</td>;
            case '097741':
                return <td className="currency">JPY</td>;
            case '099741':
                return <td className="currency">EUR</td>;
            default:
                return <td>NONE</td>;
            
        }
    }
      

    const GraphCreate = () => {
        let count = 0;
        let sortedItemGroup = [];
    
        // Sort the data based on noncomm_positions_long_all values in descending order
        const sortedData = data !== null ? [...data].sort((a, b) => b[0].noncomm_positions_long_all - a[0].noncomm_positions_long_all) : [];
    
        // Calculate longHeight for each item and sort based on it
        sortedData.forEach((itemGroup, index) => {
            const calculatedItemGroup = itemGroup.map(item => {
            const totalPosition = item.noncomm_positions_long_all + item.noncomm_positions_short_all;
            const longHeight = (item.noncomm_positions_long_all / totalPosition) * 300;
            const longpercentage = ((item.noncomm_positions_long_all / totalPosition) * 100).toFixed(2);
            const preweek_long = (item.noncomm_positions_long_all - item.change_in_noncomm_long_all);
            const preweek_short = (item.noncomm_positions_short_all - item.change_in_noncomm_short_all);
            const preweek_total = (preweek_long + preweek_short);
            const preweek_long_percent = ((preweek_long / preweek_total) * 100).toFixed(2);
            const netchange = (preweek_long_percent - longpercentage);

            return {
                ...item,
                longHeight,
                netchange
            };
        });

            // Sort calculatedItemGroup based on longHeight in descending order
            const sortedGroup = calculatedItemGroup.sort((a, b) => b.longHeight - a.longHeight);
            sortedItemGroup.push(sortedGroup);
        });
    
        // Flatten the array of arrays and sort it based on longHeight in descending order
        const flattenedSortedItemGroup = sortedItemGroup.flat().sort((a, b) => b.longHeight - a.longHeight);
        // Flatten the array of arrays and sort it based on longHeight in descending order
        const tableSortedItemGroup = sortedItemGroup.flat().sort((a, b) => b.netchange - a.netchange);
        console.log(tableSortedItemGroup)
    
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
                    {flattenedSortedItemGroup.map((item, index) => {
                        // Increment the count variable for each iteration of the loop
                        count++;
                        const totalPosition = item.noncomm_positions_long_all + item.noncomm_positions_short_all;
                        const longHeight = (item.noncomm_positions_long_all / totalPosition) * 300 + 'px'; // Convert to 'px' after sorting
                        const shortHeight = (300 - (item.noncomm_positions_long_all / totalPosition) * 300) + 'px'; // Calculate shortHeight based on longHeight
                        const longpercentage = ((item.noncomm_positions_long_all / totalPosition) * 100).toFixed(2);
                        const shortpercentage = (100 - longpercentage).toFixed(2);
                        const dataLength = sortedData.length;
                        const innercontainerwidth = (100 / dataLength) + '%';
    
                        return (
                            <div className='innercontainer' style={{ width: "3%", margin: '5px'}}>
                                <div className='belowbar' style={{ height: shortHeight, backgroundColor: 'rgb(233, 101, 101)' }}>
                                    {/* <p>{shortpercentage}%</p>*/}
                                </div>
                                <div className='abovebar' style={{ height: longHeight, backgroundColor: 'rgb(65, 88, 208)' }}>
                                    {/* <p>{longpercentage}%</p>*/}
                                </div>
                                <p className='barname' style={{ marginTop: count % 2 === 0 ? '0px' : '20px' }}>{renderSwitch(item.cftc_contract_market_code)}</p>
                            </div>
                        );
                    })}
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
                            {tableSortedItemGroup.map((item, index) => {
                                const totalPosition = item.noncomm_positions_long_all + item.noncomm_positions_short_all;
                                const longpercentage = ((item.noncomm_positions_long_all / totalPosition) * 100).toFixed(2);
                                const shortpercentage = (100 - (longpercentage)).toFixed(2);
                                const preweek_long = (item.noncomm_positions_long_all - item.change_in_noncomm_long_all);
                                const preweek_short = (item.noncomm_positions_short_all - item.change_in_noncomm_short_all);
                                const preweek_total = (preweek_long + preweek_short);
                                const preweek_long_percent = ((preweek_long / preweek_total) * 100).toFixed(2);
                                const netchange = (preweek_long_percent - longpercentage).toFixed(2);
                                return (
                                    <tr key={index}>
                                        <td className='asset_td' style={{ backgroundColor: netchange > 0 ? `rgba(65, 88, 208, ${1 - index * 0.05})` : `rgba(233, 101, 101, ${index * 0.03})` }}>{renderSwitch(item.cftc_contract_market_code)}</td>
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
                                        <td style={{ backgroundColor: netchange > 0 ? `rgba(65, 88, 208, ${1 - index * 0.05})` : `rgba(233, 101, 101, ${index * 0.03})` }}>{netchange + '%'}</td>
                                    </tr>
                                );
                            })}
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
