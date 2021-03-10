import razorpay
import configparser
import pprint
import json

config= configparser.ConfigParser()
config.read('creds.ini')
USER_KEY = config['RAZORPAY']['key_id']
SECRET_KEY = config['RAZORPAY']['key_secret']
client = razorpay.Client(auth=(USER_KEY, SECRET_KEY))

data = {
        "amount" : 5000,
        "currency": "INR",
        "receipt": "order_rcptid_11"
    }
resp = client.order.create(data= data)
print(type(resp))
tt= json.dumps(resp, indent=4)
print(tt)
