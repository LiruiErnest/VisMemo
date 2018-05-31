import os
import glob
import pandas as pd
import shutil

#get filename list
targetData = pd.read_csv('target data.csv',encoding="latin-1");
imglist = targetData['filename']
dir_src = '/Users/lirui/Dropbox/Visualization/Work/Data collection/publish dataset';
dir_dst = '/Users/lirui/Dropbox/Visualization/Work/Data collection/publish dataset/target';

for i in imglist[0:]:
    shutil.copy(os.path.join(dir_src, i), dir_dst)
