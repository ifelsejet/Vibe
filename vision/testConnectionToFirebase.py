from firebase import firebase

firebase = firebase.FirebaseApplication("https://vibe-269707.firebaseio.com",None)

data = {
    'Temp' : 5
    }

result = firebase.post('/TestData/', data)

print(result)
