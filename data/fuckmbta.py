import csv

# File path to shapes.txt
shapes_file = './data/gtfs_subway/mbtadata.txt'

# Set to store unique shape_ids
unique_shape_ids = set()

# Read the shapes.txt file and extract unique shape_ids
with open(shapes_file, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        unique_shape_ids.add(row['shape_id'])

# Print the count of unique shape_ids
print(f"Total unique shape IDs: {len(unique_shape_ids)}")