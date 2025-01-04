import pandas as pd
import os

print("cwd: ", os.getcwd())

data = pd.read_csv('data/stationlist.csv')

df = pd.DataFrame(data)

cols_to_drop = [0, 1, 2, 4, 5, 6, 7, 8, 9, 11, 14, 15]
cols_to_drop_names = df.columns[cols_to_drop]

filtered_df = df.drop(columns=cols_to_drop_names)

filtered_df.to_csv('data/temp_stationlist.csv', index=False)