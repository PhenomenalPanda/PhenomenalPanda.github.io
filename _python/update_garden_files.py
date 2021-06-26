import json
DATA_DIRECTORY_RELATIVE = '../_data/'
SOURCE_FILE = 'US_gardens.json'
LIST_FILE = 'garden_list.json'
MINIFIED_FILE = "US_gardens.min.json"

# Convert to garden_list
with open(DATA_DIRECTORY_RELATIVE+SOURCE_FILE,"r") as f:
    gardens = json.load(f)
garden_list = [y for x, y in gardens.items()]

# Save to list file
with open(DATA_DIRECTORY_RELATIVE + LIST_FILE, "w") as f:
     json.dump(garden_list, f, separators=(',',':'))
 
# save to minified file 
with open(DATA_DIRECTORY_RELATIVE+MINIFIED_FILE,"w") as f:
    json.dump(gardens, f, separators=(',',':'))