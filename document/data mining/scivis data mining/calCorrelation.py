import numpy as np
import pandas as pd 
import csv
from scipy.stats import spearmanr
from scipy.stats import norm

resultCollection = []

for i in range(25):
    # Check consistency
    # 1. load data
    data = pd.read_csv('AMT lab4.csv',encoding="latin-1")
    data;

    #2. randomly split participants into 2 parts
    group1=data.sample(frac=0.5)
    group2=data.drop(group1.index)

    #3. compute lab result
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

    Image1 = []
    Image2 = []

    Image1 = countImage(group1, Image1)
    Image2 = countImage(group2, Image2)

    result1 = Image1[208:258];
    result2 = Image2[208:258];

    r1 =  pd.DataFrame(result1, columns=['hit','miss','fa','cr'])
    r2 = pd.DataFrame(result2, columns=['hit','miss','fa','cr'])

    for i in range(0,50):
        r1.loc[i,'HR'] = round(r1.loc[i,'hit']/(r1.loc[i,'hit'] + r1.loc[i,'miss']),4) 
        r1.loc[i,'FAR'] = round(r1.loc[i,'fa']/(r1.loc[i,'fa'] + r1.loc[i,'cr']),4) 
        r2.loc[i,'HR'] = round(r2.loc[i,'hit']/(r2.loc[i,'hit'] + r2.loc[i,'miss']),4) 
        r2.loc[i,'FAR'] = round(r2.loc[i,'fa']/(r2.loc[i,'fa'] + r2.loc[i,'cr']),4)

    for i in range(0,50):
        r1.loc[i,'score1'] = norm.ppf(r1.loc[i,'HR']) - norm.ppf(r1.loc[i,'FAR'])
        r2.loc[i,'score2'] = norm.ppf(r2.loc[i,'HR']) - norm.ppf(r2.loc[i,'FAR'])


    a = []
    b = []
    c = []
    d = []
    e = []
    f = []
    for i in range(0,50):
        a.append(r1.loc[i,'HR'])
        b.append(r2.loc[i,'HR'])
        c.append(r1.loc[i,'FAR'])
        d.append(r2.loc[i,'FAR'])
        e.append(r1.loc[i,'score1'])
        f.append(r2.loc[i,'score2'])

    #corr, p_value = spearmanr(a, b)
    #print(corr)

    #corr, p_value = spearmanr(c, d)
    #print(corr)
    #print(len(e))
    #print(len(f))
    score_corr, p_value = spearmanr(e,f)
    #print(corr)

    resultCollection.append(score_corr)

reM = np.array(resultCollection)
print(np.mean(reM))



#print(resultCollection)
















