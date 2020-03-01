from firebase import firebase
import os, io
from google.cloud import vision
import pandas as pd

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'vibe-269707-d1cb5997e2a4.json'


client = vision.ImageAnnotatorClient()

def detect_faces_uri(uri):
    """Detects faces in the file located in Google Cloud Storage or the web."""
    image = vision.types.Image()
    image.source.image_uri = uri


    #with io.open(image_path, 'rb') as image_file:
    #content = image_file.read()

    #image = vision.types.Image(content=content)
    response = client.face_detection(image=image)
    faceAnnotations = response.face_annotations
    
    likehood = (0, 1, 2, 3, 4, 5)

    #Return variables
    level = 0
    isAngry = ''
    isJoy = ''
    isSad = ''

    for face in faceAnnotations:
        
        level = face.detection_confidence
        isAngry = likehood[face.anger_likelihood]
        isJoy = likehood[face.joy_likelihood]
        isSad = likehood[face.sorrow_likelihood]

        list=[isAngry,isJoy,isSad]
        print(level)
        print(max(list))
    
detect_faces_uri('https://firebasestorage.googleapis.com/v0/b/vibe-269707.appspot.com/o/Screen%20Shot%202020-03-01%20at%204.51.43%20AM.png?alt=media&token=8469535c-cb81-4e4c-a79d-a3a9b2806ada')
    
