// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Import the Dialogflow module and response creation dependencies
// from the Actions on Google client library.
const {
  dialogflow,
  BasicCard,
  Permission,
  Suggestions,
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Define a mapping of mood mapping to song choice.
const moodMap = {
  'sad': {
    // {
      title: 'Sad song 1',
      text: 'ice bear dizzle',
      image: {
        url: 'https://pbs.twimg.com/profile_images/907877641600081920/Q-T24ni-_400x400.jpg',
        accessibilityText: 'Ice bear',
      },
    // }
    // , 
    // {
    //   songTitle: 'Sad song 2',
    //   artist: 'ice bear 2',
    // }
  },
  'happy': {
    // {
      title: 'exciting song 1',
      text: 'burning bear dizzle',
      image: {
        url: 'https://media1.tenor.com/images/afa64492e35fc490d8795c7ce067c558/tenor.gif?itemid=12487470',
        accessibilityText: 'Ice bear',
      },
    // }
    // , 
    // {
    //   songTitle: 'exciting song 2',
    //   artist: 'buring bear 2',
    // }
  },
  'angry': {
    // {
      title: 'angry song 1',
      text: 'sucidal bear dizzle',
    // }
    // , 
    // {
    //   songTitle: 'angry song 2',
    //   artist: 'sucidal bear 2',
    // }
  }
  ,
  'ok': {
    // {
      title: 'netural song 1',
      text: 'plain bear dizzle',
    // }
    // , 
    // {
    //   songTitle: 'neutral song 2',
    //   artist: 'plain bear 2',
    // }
  },
};


 app.intent('mood', (conv, {mood}) => {
  const luckyNumber = mood.length;
  const audioSound = 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg';
//a map 
  
  conv.close(`Ok. Try...`, new BasicCard(moodMap[mood]));




    // conv.ask(`<speak>Your lucky number is ${luckyNumber}.` +
    //   `<audio src="${audioSound}"></audio> ` +
    //   `Would you like to hear some fake colors?</speak>`);
    // conv.ask(new Suggestions('Yes', 'No'));
  
});

// // Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// // agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
// app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
//   if (!permissionGranted) {
//     // If the user denied our request, go ahead with the conversation.
//     conv.ask(`OK, no worries. What's your favorite color?`);
//     conv.ask(new Suggestions('Blue', 'Red', 'Green'));
//   } else {
//     // If the user accepted our request, store their name in
//     // the 'conv.user.storage' object for the duration of the conversation.
//     conv.user.storage.userName = conv.user.name.display;
//     conv.ask(`Thanks, ${conv.user.storage.userName}. What's your favorite color?`);
//     conv.ask(new Suggestions('Blue', 'Red', 'Green'));
//   }
// });

// // Handle the Dialogflow intent named 'favorite color'.
// // The intent collects a parameter named 'color'.
// app.intent('favorite color', (conv, {color}) => {
//   const luckyNumber = color.length;
//   const audioSound = 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg';
//   if (conv.user.storage.userName) {
//     // If we collected user name previously, address them by name and use SSML
//     // to embed an audio snippet in the response.
//     conv.ask(`<speak>${conv.user.storage.userName}, your lucky number is ` +
//       `${luckyNumber}.<audio src="${audioSound}"></audio> ` +
//       `Would you like to hear some fake colors?</speak>`);
//     conv.ask(new Suggestions('Yes', 'No'));
//   } else {
//     conv.ask(`<speak>Your lucky number is ${luckyNumber}.` +
//       `<audio src="${audioSound}"></audio> ` +
//       `Would you like to hear some fake colors?</speak>`);
//     conv.ask(new Suggestions('Yes', 'No'));
//   }
// });

// // Handle the Dialogflow intent named 'favorite fake color'.
// // The intent collects a parameter named 'fakeColor'.
// app.intent('favorite fake color', (conv, {fakeColor}) => {
//   // Present user with the corresponding basic card and end the conversation.
//   conv.close(`Here's the color`, new BasicCard(colorMap[fakeColor]));
// });

// // Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

// // Handle the Dialogflow NO_INPUT intent.
// // Triggered when the user doesn't provide input to the Action
// app.intent('actions_intent_NO_INPUT', (conv) => {
//   // Use the number of reprompts to vary response
//   const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
//   if (repromptCount === 0) {
//     conv.ask('Which color would you like to hear about?');
//   } else if (repromptCount === 1) {
//     conv.ask(`Please say the name of a color.`);
//   } else if (conv.arguments.get('IS_FINAL_REPROMPT')) {
//     conv.close(`Sorry we're having trouble. Let's ` +
//       `try this again later. Goodbye.`);
//   }
// });