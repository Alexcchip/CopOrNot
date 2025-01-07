import json
import os

input = "./data/polyline.json"

output_dir = "./data/subway_routes"
os.makedirs(output_dir, exist_ok=True)

with open(input, "r") as file:
    data = json.load(file)

for route_name, points in data.items():
    filename = os.path.join(output_dir, f"{route_name}.json")
    with open(filename, "w") as file:
        json.dump(points, file, indent=4)