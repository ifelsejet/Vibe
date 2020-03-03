#!/bin/bash
n1=$(curl -k -s "https://vibe-269707.firebaseio.com/PiData/NewInfo.json" | jq -r '.img')
pyVal=$(echo $n1 | python3 detectionAPIwithLinks.py)
echo $pyVal | python3 led.py

