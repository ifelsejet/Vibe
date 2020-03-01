from firebase import firebase
import os, io
from google.cloud import vision
import pandas as pd

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'vibe-269707-d1cb5997e2a4.json'

firebase = firebase.FirebaseApplication("https://vibe-269707.firebaseio.com",None)

client = vision.ImageAnnotatorClient()

file_name = 'emotion.jpg'
image_path = f'.\Images\{file_name}'

with io.open(image_path, 'rb') as image_file:
    content = image_file.read()

image = vision.types.Image(content=content)
response = client.face_detection(image=image)
faceAnnotations = response.face_annotations

#likehood = ('Unknown', 'Very Unlikely', 'Unlikely', 'Possibly', 'Likely', 'Very Likely')
likehoodNums = (0,1,2,3,4,5)

#Return variables
level = 0
isAngry = ''
isJoy = ''
isSad = ''

for face in faceAnnotations:
    #print('Detection Confidence {0}'.format(face.detection_confidence))
    #print('Angry likelyhood: {0}'.format(likehoodNums[face.anger_likelihood]))
    #print('Joy likelyhood: {0}'.format(likehoodNums[face.joy_likelihood]))
    #print('Sorrow likelyhood: {0}'.format(likehoodNums[face.sorrow_likelihood]))


    level = face.detection_confidence
    isAngry = likehoodNums[face.anger_likelihood]
    isJoy = likehoodNums[face.joy_likelihood]
    isSad = likehoodNums[face.sorrow_likelihood]

    list=[isAngry,isJoy,isSad]
    print(level)
    print(max(list))
