import pandas as pd
import json
import os

os.chdir('./data')
print("cwd: ", os.getcwd())

shapes = pd.read_csv('./gtfs_subway/shapes.txt')

#group by shape id
grouped_shapes = shapes.groupby('shape_id')

#creating dict for polylines
polylines= {}
for shape_id, group in grouped_shapes:
    group = group.sort_values('shape_pt_sequence')
    coordinates =[
        {"latitude": row['shape_pt_lat'], "longitude": row['shape_pt_lon']}
        for _, row in group.iterrows()
    ]
    polylines[shape_id] = coordinates

with open("polyline.json", "w") as f:
    json.dump(polylines, f, indent=4)

print("success")
