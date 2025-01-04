    #!/usr/bin/env python

    # make sure to install these packages before running:
    # pip install pandas
    # pip install sodapy

    import pandas as pd
    from sodapy import Socrata
    #from passwords import *
    from dotenv import load_dotenv
    import os
    import requests
    import csv

    # Load environment variables from .env file
    load_dotenv()

    print("hi")
    os.chdir('making_datapoints')
    print(os.getcwd())
    print(os.path.exists('unique_station_ids.csv'))
    print("hi2")

    # Access the API token
    API_TOKEN = os.getenv('API_TOKEN')
    # Unauthenticated client only works with public data sets. Note 'None'
    # in place of application token, and no username or password:
    client = Socrata("data.ny.gov", API_TOKEN)
    client.timeout = (60, 60)  # (connect timeout, read timeout)

    def datapoint(station_id):
        # Define the station_complex_id you want to pull data for
        station_id = str(station_id)
        start_date = '2023-01-01T00:00:00'
        end_date = '2023-12-31T23:59:59'

        # Pull 8760 (yearly) results for metro card types
        results_metro_full = client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='metrocard' AND fare_class_category='Metrocard - Full Fare' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)
        results_metro_fair = client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='metrocard' AND fare_class_category='Metrocard - Fair Fare' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)
        results_metro_other = client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='metrocard' AND fare_class_category='Metrocard - Other' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)
        results_metro_senior = client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='metrocard' AND fare_class_category='Metrocard - Seniors & Disability' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)
        results_metro_student = client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='metrocard' AND fare_class_category='Metrocard - Students' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)
        results_metro_unlimited = client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='metrocard' AND fare_class_category='Metrocard - Unlimited 30-Day' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)
        results_metro_unlimited_7d = client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='metrocard' AND fare_class_category='Metrocard - Unlimited 7-Day' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)

        #pull 8760 (yearly) results from omny
        results_omny_full= client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='omny' AND fare_class_category='OMNY - Full Fare' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)
        results_omny_other = client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='omny' AND fare_class_category='OMNY - Other' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)
        results_omny_seniors = client.get("wujg-7c2s", where=f"station_complex_id = '{station_id}' AND payment_method='omny' AND fare_class_category='OMNY - Seniors & Disability' AND transit_timestamp >= '{start_date}' AND transit_timestamp <= '{end_date}'", limit=10000)

        # Convert the results to a DataFrame
        metro_full_df = pd.DataFrame.from_records(results_metro_full)
        metro_fair_df = pd.DataFrame.from_records(results_metro_fair)
        metro_other_df = pd.DataFrame.from_records(results_metro_other)
        metro_senior_df = pd.DataFrame.from_records(results_metro_senior)
        metro_student_df = pd.DataFrame.from_records(results_metro_student)
        metro_unlimited_df = pd.DataFrame.from_records(results_metro_unlimited)
        metro_unlimited_7d_df = pd.DataFrame.from_records(results_metro_unlimited_7d)

        omny_full_df = pd.DataFrame.from_records(results_omny_full)
        omny_other_df = pd.DataFrame.from_records(results_omny_other)
        omny_seniors_df = pd.DataFrame.from_records(results_omny_seniors)


        
        metro_full_df = metro_full_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])
        metro_fair_df = metro_fair_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])
        metro_other_df = metro_other_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])
        metro_senior_df = metro_senior_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])
        metro_student_df = metro_student_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])
        metro_unlimited_df = metro_unlimited_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])
        metro_unlimited_7d_df = metro_unlimited_7d_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])

        omny_full_df = omny_full_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])
        omny_other_df = omny_other_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])
        omny_seniors_df = omny_seniors_df.drop(columns=['transit_mode', 'transit_timestamp', 'transfers'])
        metro_full_df['ridership'] = pd.to_numeric(metro_full_df['ridership'], errors='coerce')
        metro_fair_df['ridership'] = pd.to_numeric(metro_fair_df['ridership'], errors='coerce')
        metro_other_df['ridership'] = pd.to_numeric(metro_other_df['ridership'], errors='coerce')
        metro_senior_df['ridership'] = pd.to_numeric(metro_senior_df['ridership'], errors='coerce')
        metro_student_df['ridership'] = pd.to_numeric(metro_student_df['ridership'], errors='coerce')
        metro_unlimited_df['ridership'] = pd.to_numeric(metro_unlimited_df['ridership'], errors='coerce')
        metro_unlimited_7d_df['ridership'] = pd.to_numeric(metro_unlimited_7d_df['ridership'], errors='coerce')

        omny_full_df['ridership'] = pd.to_numeric(omny_full_df['ridership'], errors='coerce')
        omny_other_df['ridership'] = pd.to_numeric(omny_other_df['ridership'], errors='coerce')
        omny_seniors_df['ridership'] = pd.to_numeric(omny_seniors_df['ridership'], errors='coerce')
        metro_full_data = metro_full_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()
        metro_fair_data = metro_fair_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()
        metro_other_data = metro_other_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()
        metro_senior_data = metro_senior_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()
        metro_student_data = metro_student_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()
        metro_unlimited_data = metro_unlimited_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()
        metro_unlimited_7d_data = metro_unlimited_7d_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()

        omny_full_data = omny_full_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()
        omny_other_data = omny_other_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()
        omny_seniors_data = omny_seniors_df.groupby(['station_complex_id', 'station_complex', 'borough', 'payment_method', 'latitude', 'longitude']).agg({'ridership': 'sum'}).reset_index()

        metro_full_data = metro_full_data.drop(columns=['payment_method'])
        metro_fair_data = metro_fair_data.drop(columns=['payment_method'])
        metro_other_data = metro_other_data.drop(columns=['payment_method'])
        metro_senior_data = metro_senior_data.drop(columns=['payment_method'])
        metro_student_data = metro_student_data.drop(columns=['payment_method'])
        metro_unlimited_data = metro_unlimited_data.drop(columns=['payment_method'])
        metro_unlimited_7d_data = metro_unlimited_7d_data.drop(columns=['payment_method'])

        omny_full_data = omny_full_data.drop(columns=['payment_method'])
        omny_other_data = omny_other_data.drop(columns=['payment_method'])
        omny_seniors_data = omny_seniors_data.drop(columns=['payment_method'])

        # Step 1: Start by merging all the metro dataframes
        metro_combined_df = metro_full_data.merge(metro_fair_data, on=['station_complex_id', 'station_complex', 'borough', 'latitude', 'longitude'], suffixes=('_full', '_fair')) \
            .merge(metro_other_data, on=['station_complex_id', 'station_complex', 'borough', 'latitude', 'longitude'], suffixes=('', '_other')) \
            .merge(metro_senior_data, on=['station_complex_id', 'station_complex', 'borough', 'latitude', 'longitude'], suffixes=('', '_senior')) \
            .merge(metro_student_data, on=['station_complex_id', 'station_complex', 'borough', 'latitude', 'longitude'], suffixes=('', '_student')) \
            .merge(metro_unlimited_data, on=['station_complex_id', 'station_complex', 'borough', 'latitude', 'longitude'], suffixes=('', '_unlimited')) \
            .merge(metro_unlimited_7d_data, on=['station_complex_id', 'station_complex', 'borough', 'latitude', 'longitude'], suffixes=('', '_unlimited_7d'))

        # Step 2: Now, merge the OMNY dataframes similarly (no suffixes needed here)
        omny_combined_df = omny_full_data.merge(omny_other_data, on=['station_complex_id', 'station_complex', 'borough', 'latitude', 'longitude'], suffixes=('_full', '_other')) \
            .merge(omny_seniors_data, on=['station_complex_id', 'station_complex', 'borough',  'latitude', 'longitude'], suffixes=('', '_senior'))


        combined_df = metro_combined_df.merge(omny_combined_df, on=['station_complex_id', 'station_complex', 'borough', 'latitude', 'longitude'], how='outer', suffixes=('_metro', ''))
        combined_df['total_ridership'] = combined_df.filter(like='ridership').sum(axis=1, skipna=True)

        combined_df = combined_df.drop(columns=['ridership_full_metro', 'ridership_fair',
        'ridership_metro', 'ridership_senior', 'ridership_student',
        'ridership_unlimited', 'ridership_unlimited_7d', 'ridership_full',
        'ridership_other', 'ridership', ])
        
        combined_df['station_name'] = combined_df['station_complex'].str.extract(r'^(.*?) \(')
        combined_df['train_lines'] = combined_df['station_complex'].str.extract(r'\((.*?)\)')

        combined_df = combined_df.drop(columns=['station_complex', 'borough'])
        
        combined_df['train_lines'] = combined_df['train_lines'].str.replace(',', ' ')

        datapoint = combined_df

        return datapoint

    station_ids = pd.read_csv('unique_station_ids.csv')

    #stations_df = pd.DataFrame()

    # Step 2: Loop through each row and print the value from the single column
    for index, row in station_ids.iterrows():
        dpt = datapoint(row[0])
        dpt.to_csv('copornot.csv', mode='a', index=False, header=False)
        print("station index done: ", index)
        


    # for index, row in station_ids.iloc[half_len:].iterrows():
    #     dpt = datapoint(row[0])
    #     stations_df = pd.concat([stations_df, dpt], ignore_index=True)
    #     print("station_id done: ", row[0])

    # stations_df.to_csv('station_total_ridership_data2.csv', index=False)