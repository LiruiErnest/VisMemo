# Clean the original data

# coding=utf-8

# import neccessary packages
import numpy as np
import pandas as pd
import csv
import pymongo as pm

image2KData = pd.read_csv('single2k_metadata.csv',encoding="utf-8")
image410Data = pd.read_csv('targets410_metadata.csv',encoding="latin1")['filename']



del image2KData['url']
# our outside image link is http://otnk64q13.bkt.clouddn.com/
image2KData['url'] = 'http://otnk64q13.bkt.clouddn.com/'+image2KData['filename']


# map target images in filler image
image2KData['isTarget'] =np.where(image2KData['filename'].isin(image410Data),1,0)

# sort by filler and target
image2KsortData = image2KData.sort_values(by = ['isTarget']).reset_index()
image2KsortData['imageID'] = image2KsortData.index
image2KsortData['imageID'] = image2KsortData['imageID'] + 'I'

del image2KsortData['index']

# store in csv
image2KsortData.to_csv('1.csv',index=False)

