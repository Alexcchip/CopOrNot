import csv
import json
from collections import defaultdict

# Input and output file paths
shapes_file = './data/gtfs_subway/mbtadata.txt'
output_file = './data/mbta_polyline.json'

# Dictionary to hold the processed data
shapes_data = defaultdict(list)

# Process the shapes.txt file
with open(shapes_file, 'r') as file:
    reader = csv.reader(file)
    header = next(reader)  # Skip the header row
    for row in reader:
        try:
            # Parse the fields, assuming the file has no blank rows
            shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence = (
                row[0], 
                float(row[1]), 
                float(row[2]), 
                int(row[3])
            )
            # Append to the corresponding shape_id
            shapes_data[shape_id].append({
                "latitude": shape_pt_lat,
                "longitude": shape_pt_lon
            })
        except ValueError as e:
            print(f"Error processing row {row}: {e}")  # Log the error

# Convert to JSON format and save
import json
with open(output_file, 'w') as json_file:
    json.dump([{"shapeId": k, "coordinates": v} for k, v in shapes_data.items()], json_file, indent=2)

print(f"Converted shapes.txt to {output_file}")