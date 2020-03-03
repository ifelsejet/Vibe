from gpiozero import RGBLED
from gpiozero import LED
from time import sleep

rgbLed = RGBLED(7,8,25)
ledStrip = LED(18)
rgbLed.pulse(3,3,(0,1,0),(0,1,0))

while True:
    ledStrip.on()
    sleep(5)
    ledStrip.off()
    sleep(6)

