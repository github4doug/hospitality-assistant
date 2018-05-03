export default [
    {
        id: '1',
        datetime: "2008-03-09 16:05:07.123",
        source: "email",
        type: "locked out",
        message: "Hi. I am locked out of apartment 23 and really need your help ASAP! Waiting on what to do next",
        content: '<p>You are driving back from Lake Tahoe from a family ski trip. Your guest has sent an urgent email to you about getting locked out of the rental. Your Assistant recognizes</p><ul><li>the guest email is urgent</li><li>you have not replied to the guest within 15 minutes</li><li>it is outside your  working hours</li></ul><p>Your Assistant automatically</p><ul><li>sends the guest a link for instructions on what to do when locked out</li><li>alerts you by phone and transcribes their urgent issue</li><li>prompts you to talk with the guest OR send an sms to the guest to confirm everything is ok</li></ul>'
    },
    {
        id: '2',
        datetime: "2008-03-09 16:05:07.123",
        source: "text",
        type: "wifi broken",
        message: "Can you please get back to me about the WIFI? I have a paper due tomorrow and I really need to get this sent out.  Contact me as soon as you get this.",
        content:'<p>You are on the golf course with an important client. One of your guests has been trying to connect to the WIFI to no avail. They are sending you urgent text messages about WIFI issues. Your Assistant recognizes</p><ul><li>the guest text is urgent</li><li>you have not replied to the guest within 15 minutes</li><li>you are away from the house</li></ul><p>Your Assistant automatically</p><ul><li>sends the guest a text with WIFI troubleshooting guide</li><li>alerts you by phone and transcribes their urgent issue</li><li>prompts you to talk with the guest and follow up on the issue</li></ul>'
    },
    {
        id: '3',
        datetime: "2008-03-09 16:05:07.123",
        source: "voicemail",
        type: "water leak",
        message: "The apartment is flooding with water. I only have your phone number. Please respond on what to do, this is urgent.",
        content:'<p>You are on a 3 day trip to Costa Rica and forwarding calls to your dumb phone you rented. Your guest has left an urgent voicemail about the apartment flooding. Your Assistant recognizes</p><ul><li>the guest voicemail is urgent</li><li>you have not replied to the guest within 15 minutes</li><li>you are travelling outside the US</li></ul><p>Your Assistant automatically</p><ul><li>sends the guest a link on emergency services</li><li>alerts you by phone and transcribes the urgent voicemail</li><li>prompts you to connect to the guest immediately</li></ul>'
    }
];
