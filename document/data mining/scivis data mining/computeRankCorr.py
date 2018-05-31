import numpy as np
import pandas as pd
import csv
from scipy.stats import spearmanr
from scipy.stats import norm

data = pd.read_csv('AMT lab4.csv',encoding="latin-1")
data;

def countImage(data,Imge):   
    Image = []
    for i in range(300):
        ImageSub = [0] * 4
        Image.append(ImageSub)   
    length = len(data)
    for i in range(length):
        personData = data.iloc[i,0].split(';')
        repeatIndex = {}
        personLength = len(personData) - 1
        for j in range(personLength):
            imageResult = personData[j].split(',')
            if(imageResult[0] not in repeatIndex):
                repeatIndex[imageResult[0]] = 1
                if(imageResult[1] == '7'):
                    Image[int(imageResult[0])][2] += 1
                elif(imageResult[1] == '8'):
                    Image[int(imageResult[0])][3] += 1
            elif(imageResult[0] in repeatIndex):
                repeatIndex[imageResult[0]] += 1
                if(repeatIndex[imageResult[0]] == 2):
                    if(imageResult[1] == '5'):
                        Image[int(imageResult[0])][0] += 1
                    elif(imageResult[1] == '6'):
                        Image[int(imageResult[0])][1] += 1
    return Image

Image = []
Image = countImage(data,Image);

result = Image[208:258];

r =  pd.DataFrame(result, columns=['hit','miss','fa','cr'])

for i in range(0,50):
        r.loc[i,'HR'] = round(r.loc[i,'hit']/(r.loc[i,'hit'] + r.loc[i,'miss']),4) 
        r.loc[i,'FAR'] = round(r.loc[i,'fa']/(r.loc[i,'fa'] + r.loc[i,'cr']),4) 

#r.to_csv('lab4 total.csv',index=False)

data2 = pd.read_csv('lab4 total.csv',encoding="latin-1")

for i in range(0,50):
    data2.loc[i,'score1'] = norm.ppf(data2.loc[i,'HR']) - norm.ppf(data2.loc[i,'FAR'])
    data2.loc[i,'score2'] = norm.ppf(data2.loc[i,'HR2']) - norm.ppf(data2.loc[i,'FAR2'])

a = []
b = []
c = []
d = []
e = []
f = []
for i in range(0,50):
    a.append(data2.loc[i,'HR'])
    b.append(data2.loc[i,'HR2'])
    c.append(data2.loc[i,'FAR'])
    d.append(data2.loc[i,'FAR2'])
    e.append(data2.loc[i,'score1'])
    f.append(data2.loc[i,'score2'])

score_corr, p_value = spearmanr(e,f)
print(score_corr)
print(p_value)
