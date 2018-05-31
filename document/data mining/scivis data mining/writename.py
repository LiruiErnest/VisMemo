import os, csv

with open("1.csv", 'w') as f:
    writer = csv.writer(f)
    for path, dirs, files in os.walk("/Users/lirui/Dropbox/Visualization/Work/Data collection/scivis memorability dataset"):
        for filename in files:
            writer.writerow([filename])