import numpy as np
import pandas as pd
import csv

data = pd.read_csv('lab1 result.csv',encoding="latin-1")

# Create the Image List for storing all memory data
Image = []
for i in range(2068):
    ImageSub = [0] * 4
    Image.append(ImageSub)

# Filtering dataset
def countResult(data, Image):
    t = 0
    length = len(data)
    for i in range(length):
        personData = data.iloc[i,0].split(';')
        personLength = len(personData) - 1
        for j in range(personLength):
            imageResult = personData[j].split(',')
            if(imageResult[1] == '5'):
                Image[int(imageResult[0])][0] += 1
            elif(imageResult[1] == '6'):
                Image[int(imageResult[0])][1] += 1
            elif(imageResult[1] == '7'):
                Image[int(imageResult[0])][2] += 1
            elif(imageResult[1] == '8'):
                Image[int(imageResult[0])][3] += 1

countResult(data,Image)

ar = np.asarray(Image)
df = pd.DataFrame(data={"hits": ar[:,0], "miss": ar[:,1], "fa": ar[:,2], "cr": ar[:,3]})
df.to_csv('1.csv',index=False)