# store and extract data from mongodb

# coding=utf-8
# import neccessary packages
import sys
import pandas as pd
import pymongo
import json
import os

#write csv file to mongodb
def import_content(filepath,dbname,collectionname):
    print(filepath)
    mng_client = pymongo.MongoClient('localhost', 27017)
    mng_db = mng_client[dbname]
    collection_name = collectionname
    db_cm = mng_db[collection_name]
    cdir = os.path.dirname(__file__)
    file_res = os.path.join(cdir, filepath)

    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))
    db_cm.remove()
    db_cm.insert(data_json)

import_content('validatafinal.csv','vismemodb','imagedata')
#import_content('2.csv','vismemodb','user')