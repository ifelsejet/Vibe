import RPi.GPIO as GPIO



GPIO.setmode(GPIO.BOARD)
GPIO.setup(12,GPIO.OUT)

pwm = GPIO.PWM(12,100)
GPIO.output(12,0)

