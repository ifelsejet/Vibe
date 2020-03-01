from firebase import firebase

FirebaseConnection = firebase.FirebaseApplication("https://vibe-269707.firebaseio.com",None)


while True:
    temperature = int(input("What is the temperature? "))

    data_to_upload = {
        "Temp" : temperature
        }

    result = FirebaseConnection.post('/TestData/', data_to_upload)

    print(result)
