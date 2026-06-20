
import requests

URL = "https://student.ifda.in/api/v1/students"

i = 1
s_count = 0
while i <= 1000000:
    data = requests.get(URL)
    print(data.status_code)
    i+= 1
