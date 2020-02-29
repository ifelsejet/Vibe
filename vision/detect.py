import os, io
from google.cloud import vision
import pandas as pd

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'vibe-269707-d1cb5997e2a4.json'

client = vision.ImageAnnotatorClient()

file_name = 'emotion.jpg'
image_path = f'.\Images\{file_name}'

with io.open(image_path, 'rb') as image_file:
    content = image_file.read()

image = vision.types.Image(content=content)
response = client.face_detection(image=image)
faceAnnotations = response.face_annotations

likehood = ('Unknown', 'Very Unlikely', 'Unlikely', 'Possibly', 'Likely', 'Very Likely')

print('Faces:')
for face in faceAnnotations:
    print('Detection Confidence {0}'.format(face.detection_confidence))
    print('Angry likelyhood: {0}'.format(likehood[face.anger_likelihood]))
    print('Joy likelyhood: {0}'.format(likehood[face.joy_likelihood]))
    print('Sorrow likelyhood: {0}'.format(likehood[face.sorrow_likelihood]))
    print('Surprised ikelihood: {0}'.format(likehood[face.surprise_likelihood]))
    print('Headwear likelyhood: {0}'.format(likehood[face.headwear_likelihood]))

    face_vertices = ['({0},{1})'.format(vertex.x, vertex.y) for vertex in face.bounding_poly.vertices]
    print('Face bound: {0}'.format(', '.join(face_vertices)))
    print('')
