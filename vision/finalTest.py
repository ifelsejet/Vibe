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

likehood = ('Unknown', 'Very Unlikely', 'Unlikely', 'Possibly', 'Likely', 'Very Likely')

#Return variables
level = 0
isAngry = ''
isJoy = ''
isSad = ''

for face in faceAnnotations:
    print('Detection Confidence {0}'.format(face.detection_confidence))
    print('Angry likelyhood: {0}'.format(likehood[face.anger_likelihood]))
    print('Joy likelyhood: {0}'.format(likehood[face.joy_likelihood]))
    print('Sorrow likelyhood: {0}'.format(likehood[face.sorrow_likelihood]))


    level = face.detection_confidence
    isAngry = likehood[face.anger_likelihood]
    isJoy = likehood[face.joy_likelihood]
    isSad = likehood[face.sorrow_likelihood]

data = {
    'Confidence Level' : level,
    'Angry Level' : isAngry,
    'Joy Level' : isJoy,
    'Sadness Level' : isSad
    }

result = firebase.post('/TestData/', data)

print(result)

    
