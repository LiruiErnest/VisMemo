# import neccessary packages
import numpy as np
import pandas as pd
import csv
import pymongo as pm
import re

df = pd.DataFrame({
    'WorkID' : ['A1FJI3JI434J43','A23DFFEFERE'],
    'Gender' : ['male','female'],
    'Age': [26,56],
    'Country':['China','USA'],
    'isBlocked':['0','1'],
    'practiceTimes':[0,3],
    'warningTimes':[0,3],
    'finishLevel':[0,2],
    'labResult':['',''],
    'code':['',''],
})

#replace(r'\d',5,regex=True)
df['finishLevel'] = re.sub(r'\d','4',df['finishLevel'])
#df.to_csv('2.csv',index=False)


print(df['finishLevel'])