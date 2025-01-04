import json

with open("data/polyline.json", "r") as f:
    data = json.load(f)

unique_lines = list(data.keys())

print("unique lines: ", unique_lines)