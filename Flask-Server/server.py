from flask import Flask, jsonify
import pandas as pd
import json
from sodapy import Socrata

app = Flask(__name__)

@app.route('/cftc_data', methods=['GET'])
def get_cftc_data():
    # Initialize Socrata client
    client = Socrata("publicreporting.cftc.gov", app_token="kOiWOfMRsYWWrvOgW0hFxdJmo")

    # List of cftc_contract_market_codes
    contract_market_codes = ['232741', '090741', '092741', '096742', '112741', '097741', '098662', '088691', '084691', '076651','209742', '12460+', '13874+', '067651', '043602', '133741', '240743', '095741', '099741']

    # Initialize an empty dictionary to store results
    results_dict = {}

    # Iterate over each contract market code
    for code in contract_market_codes:
        # Fetch data from the API - Query for the latest report
        results = client.get("6dca-aqww", 
                             select="id, \
                                     market_and_exchange_names, \
                                     report_date_as_yyyy_mm_dd, \
                                     yyyy_report_week_ww, \
                                     contract_market_name, \
                                     cftc_contract_market_code, \
                                     cftc_market_code, \
                                     cftc_region_code, \
                                     cftc_commodity_code, \
                                     commodity_name, \
                                     noncomm_positions_long_all, \
                                     noncomm_positions_short_all, \
                                     change_in_noncomm_long_all, \
                                     change_in_noncomm_short_all",  
                             where=f"(cftc_contract_market_code == '{code}')",
                             order="report_date_as_yyyy_mm_dd DESC",
                             limit=1)  # Limit to 1 record to get the latest report

        # Convert data into a DataFrame
        results_df = pd.DataFrame.from_records(results)

        # Initialize a list to store results for the current code
        code_results = []

        # Iterate over the DataFrame and store the values in a dictionary
        for _, row in results_df.iterrows():
            result = {
                "cftc_contract_market_code": row['cftc_contract_market_code'],
                "market_and_exchange_names": row['market_and_exchange_names'],
                "report_date_as_yyyy_mm_dd": row['report_date_as_yyyy_mm_dd'],
                "noncomm_positions_long_all": int(row['noncomm_positions_long_all']) if row['noncomm_positions_long_all'] else 0,
                "noncomm_positions_short_all": int(row['noncomm_positions_short_all']) if row['noncomm_positions_short_all'] else 0,
                "change_in_noncomm_long_all": int(row['change_in_noncomm_long_all']) if row['change_in_noncomm_long_all'] else 0,
                "change_in_noncomm_short_all": int(row['change_in_noncomm_short_all']) if row['change_in_noncomm_short_all'] else 0
            }
            code_results.append(result)

        # Store the results for the current code in the dictionary
        results_dict[code] = code_results

    # Sort the dictionary based on the "noncomm_positions_long_all" values across all contract market codes in descending order
    sorted_results_dict = {k: sorted(v, key=lambda x: x['noncomm_positions_long_all'], reverse=True) for k, v in results_dict.items()}

    # Sort the dictionary of contract market codes based on the highest non-commercial long positions
    sorted_results_dict = dict(sorted(sorted_results_dict.items(), key=lambda item: item[1][0]['noncomm_positions_long_all'], reverse=True))

    # Return the data as JSON
    return jsonify(sorted_results_dict)

if __name__ == '__main__':
    app.run(debug=True)
