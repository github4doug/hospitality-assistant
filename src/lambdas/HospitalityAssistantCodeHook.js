// Get the AWS SDK and Dynamo SDKs ready
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var connect = new AWS.Connect();
'use strict';

 /**
  * This sample demonstrates an implementation of the Lex Code Hook Interface
  * For instructions on how to set up and test this bot, as well as additional samples,
  *  visit the Lex Getting Started documentation.
  */


 // --------------- Helpers to build responses which match the structure of the necessary dialog actions -----------------------

function elicitSlot(sessionAttributes, intentName, slots, slotToElicit, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
        },
    };
}

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}

// ---------------- Helper Functions --------------------------------------------------

function parseLocalDate(date) {
    /**
     * Construct a date object in the local timezone by parsing the input date string, assuming a YYYY-MM-DD format.
     * Note that the Date(dateString) constructor is explicitly avoided as it may implicitly assume a UTC timezone.
     */
    const dateComponents = date.split(/\-/);
    return new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
}

function isValidDate(date) {
    try {
        return !(isNaN(parseLocalDate(date).getTime()));
    } catch (err) {
        return false;
    }
}

function buildValidationResult(isValid, violatedSlot, messageContent) {
    if (messageContent == null) {
        return {
            isValid,
            violatedSlot,
        };
    }
    return {
        isValid,
        violatedSlot,
        message: { contentType: 'PlainText', content: messageContent },
    };
}

function validateSlots(name, phoneNumber) {
    /*
    const flowerTypes = ['lilies', 'roses', 'tulips'];
    if (flowerType && flowerTypes.indexOf(flowerType.toLowerCase()) === -1) {
        return buildValidationResult(false, 'FlowerType', `We do not have ${flowerType}, would you like a different type of flower?  Our most popular flowers are roses`);
    }
    if (date) {
        if (!isValidDate(date)) {
            return buildValidationResult(false, 'PickupDate', 'I did not understand that, what date would you like to pick the flowers up?');
        }
        if (parseLocalDate(date) < new Date()) {
            return buildValidationResult(false, 'PickupDate', 'You can pick up the flowers from tomorrow onwards.  What day would you like to pick them up?');
        }
    }
    if (time) {
        if (time.length !== 5) {
            // Not a valid time; use a prompt defined on the build-time model.
            return buildValidationResult(false, 'PickupTime', null);
        }
        const hour = parseInt(time.substring(0, 2), 10);
        const minute = parseInt(time.substring(3), 10);
        if (isNaN(hour) || isNaN(minute)) {
            // Not a valid time; use a prompt defined on the build-time model.
            return buildValidationResult(false, 'PickupTime', null);
        }
        if (hour < 10 || hour > 16) {
            // Outside of business hours
            return buildValidationResult(false, 'PickupTime', 'Our business hours are from ten a m. to five p m. Can you specify a time during this range?');
        }
    }
     */

    return buildValidationResult(true, null, null);
}

function formatPhoneNumber(number) {
    const noCountryCodeUSA = /^\d{10}$/;
    const countryCodeUSA = /^1\d{10}$/;
    const digits = (""+number).replace(/\D/g, '');
    if (noCountryCodeUSA.test(digits)){
        return "+1" + digits;
    } 
    if (countryCodeUSA.test(digits)){
        return "+" + digits;
    }
    return null;    
}
 // --------------- Functions that control the bot's behavior -----------------------

/**
 * Performs dialog management and fulfillment
 *
 * Beyond fulfillment, the implementation of this intent demonstrates the use of the elicitSlot dialog action
 * in slot validation and re-prompting.
 *
 */
function generatePhoneCall(intentRequest, callback) {
    const name = intentRequest.currentIntent.slots.name;
    const phoneNumber = intentRequest.currentIntent.slots.phone;
    const source = intentRequest.invocationSource;

    if (source === 'DialogCodeHook') {
        // Perform basic validation on the supplied input slots.  
        // Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
        const validationResult = validateSlots(name, phoneNumber);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }

        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
        const outputSessionAttributes = intentRequest.sessionAttributes || {};
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }

    // 1. save user data  in DynamoDB
    // 2. invoke call to aws connect
    var formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    var params = {
        ContactFlowId: process.env.ContactFlowId,
        DestinationPhoneNumber: formattedPhoneNumber,
        InstanceId: process.env.ContactInstanceId,
        SourcePhoneNumber: process.env.ContactSourcePhoneNumber,
        Attributes: intentRequest.sessionAttributes};
    /* 
     Attributes: {
     '<AttributeName>': 'STRING_VALUE',
     '<AttributeName>': ... 
     },
     ClientToken: 'STRING_VALUE',
     QueueId: 'STRING_VALUE',
     SourcePhoneNumber: 'STRING_VALUE'
     }*/

    connect.startOutboundVoiceContact(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            callback('Woops seems there was an error' + err.stack);
        } else {
            console.log(data);           // successful response
            callback(close(intentRequest.sessionAttributes, 'Fulfilled',
                           { contentType: 'PlainText', content: `Nice. I'm placing a demo phone call to ${phoneNumber} right now so just answer the call and listen to the prompts. Talk to you soon. Don't worry it is not a pesky human, just me your trusty assistant. BTW it will be from ${params.SourcePhoneNumber}` }));
        } 
    });
}

 // --------------- Intents -----------------------

/**
 * Called when the user specifies an intent for this skill.
 */
function dispatch(intentRequest, callback) {
    console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}, details=${JSON.stringify(intentRequest)}`);

    const intentName = intentRequest.currentIntent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'GeneratePhoneCall') {
        return generatePhoneCall(intentRequest, callback);
    }
    throw new Error(`Intent with name ${intentName} not supported`);
}

// --------------- Main handler -----------------------

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        // By default, treat the user request as coming from the America/New_York time zone.
        process.env.TZ = 'America/New_York';
        console.log(`event.bot.name=${event.bot.name}`);

        /**
         * Uncomment this if statement and populate with your Lex bot name and / or version as
         * a sanity check to prevent invoking this Lambda function from an undesired Lex bot or
         * bot version.
         */
        if (event.bot.name !== 'HospitalityAssistant') {
             callback('Invalid Bot Name');
        }

        dispatch(event, (response) => callback(null, response));
    } catch (err) {
        callback(err);
    }
};
