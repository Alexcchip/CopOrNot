import pandas as pd

curr_data = pd.read_csv('copornot.csv')
mta_data = pd.read_csv('stationlist.csv')

missing_stations = mta_data[~mta_data['station_complex_id'].isin(curr_data['station_complex_id'])]
print(missing_stations[['station_complex_id', 'station_name']])