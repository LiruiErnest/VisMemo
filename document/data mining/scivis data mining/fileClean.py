# this file is used to clean data name, randomly choose 210 target image
import numpy as np
import pandas as pd
import csv
import pymongo as pm
import os
import shutil
import glob

## 1. Writing filenames from a folder into a csv
def writeNametoCSV():
	with open("1.csv", 'w') as f:
		writer = csv.writer(f)
		for path, dirs, files in os.walk("/Users/lirui/Dropbox/Visualization/Work/Data collection/scivis memorability dataset"):
			for filename in files:
				writer.writerow([filename])

## 2. Updata filename
def addSuffix():
	metaData = pd.read_csv('scivis data.csv',encoding="latin-1");
	metaData['filename'] = metaData['filename'] + '.png';

	# store in csv
	metaData.to_csv('scivis data2.csv',index=False)

## 3. Sample dataset to choose 230 target images
def sampleTarget():
	metaData = pd.read_csv('scivis data.csv',encoding="latin-1");
	metaSample = metaData.sample(frac=0.2)
	metaRemain = metaData.drop(metaSample.index)
	metaSample.to_csv('target data.csv',index=False)
	metaRemain.to_csv('filler data.csv',index=False)

## 4. Move target images into target directory
def moveTarget():
	# get filename list
	targetData = pd.read_csv('target data.csv', encoding="latin-1");
	imglist = targetData['filename']
	dir_src = '/Users/lirui/Dropbox/Visualization/Work/Data collection/publish dataset';
	dir_dst = '/Users/lirui/Dropbox/Visualization/Work/Data collection/publish dataset/target';

	for i in imglist[0:]:
		shutil.copy(os.path.join(dir_src, i), dir_dst)

## 5. Tag target image with label 1
def tagImage():
	metaData = pd.read_csv('scivis data.csv',encoding="latin-1");
	targetData = pd.read_csv('target data.csv',encoding="latin-1");
	targetList = targetData['filename'].tolist()
	metaData['isTarget'] = metaData.filename.isin(targetList).astype(int)
	metaData.to_csv('scivis data.csv',index=False)

## 6. update online url
def updateURL():
	metaData = pd.read_csv('s online dataset.csv', encoding="latin-1");
	metaData['url'] = 'http://web.cse.ohio-state.edu/~li.8950/data/image/sscivis1K/' + metaData['filename'];
	# store in csv
	metaData.to_csv('sonline dataset.csv', index=False)

updateURL();





