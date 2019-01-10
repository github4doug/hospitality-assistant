import json
from botocore.vendored import requests
import os
import uuid

msgId = str(uuid.uuid4())
url = os.environ['TWILIO_MESSAGES_ENDPOINT']
accountID = os.environ['TWILIO_ACCOUNT_ID']
authToken = os.environ['TWILIO_AUTH_TOKEN']
fromPhone = os.environ['TWILIO_FROM_PHONE']

def lambda_handler(event, context):
    print("EVENT:", event)
    toPhone = '4156830634'
    msg = 'sending text on request from ' + event['bot']['name'] + ', ' + event['invocationSource']
    resp = requests.post(url, data={'To':toPhone,'From':fromPhone,'Body':msg}, auth=(accountID, authToken))
    print('RESPONSE:', resp.json())
    return {
        "sessionAttributes": {},
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
            "contentType": "PlainText",
            "content": "Thank you. Your text is being delivered by way of Twilio."
            },
        }
    }
