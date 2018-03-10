#data mining section
# import necessary packages used in this project
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import csv

data = pd.read_csv('dataclean.csv',encoding="utf-8")

for i, row in data.iterrows():
    if i >= 1:
        if data.iloc[i,1] > data.iloc[i-1,1]:
            data.loc[i-1,'isLower'] = 1
        else:
            data.loc[i-1,'isLower'] = 0

data.to_csv('test.csv',index=False)
print(data)