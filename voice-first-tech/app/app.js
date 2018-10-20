'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

let smartLockIntentMap = {
    'AMAZON.HelpIntent' : 'HelpIntent',
    'AMAZON.CancelIntent': 'END'
};

// Use constructor
const config = {
    intentMap: smartLockIntentMap,
    // Other configurations
};

const app = new App(config);
app.setIntentMap(smartLockIntentMap);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({

    'ON_SIGN_IN': function() {
      if (this.googleAction().getSignInStatus() === 'CANCELLED') {
        this.tell("Sign in cancelled. Please try again by saying okay google, launch smart lock");
      } else if (this.googleAction().getSignInStatus() === 'OK') {
        this.tell("You are now signed in!");
      } else if (this.googleAction().getSignInStatus() === 'ERROR') {
        this.tell("there was an error signing in. Please try again by saying okay google, launch smart lock");
      }
    },

    'LAUNCH': function() {
        if (!this.getAccessToken()) {
          if (this.getType() == "AlexaSkill") {
            this.alexaSkill().showAccountLinkingCard();
            this.tell("Please link your account by opening the Alexa App on your mobile phone");
          } else {
            this.googleAction().showAccountLinkingCard();
          }
        } else {
          let speech = this.speechBuilder()
              .addText("I can help you control Smart Locks. Say lock the front door or unlock my front door.")
          let reprompt = this.speechBuilder()
              .addText("Say lock the front door or unlock my front door.")
          this.followUpState('FirstState')
              .ask(speech, reprompt);
        }
    },

    'HelpIntent': function() {
        let speech = this.speechBuilder()
            .addText("I can help you control Smart Locks. Say lock the front door or unlock my front door.")
        let reprompt = this.speechBuilder()
            .addText("Say lock the front door or unlock my front door.")
        this.followUpState('FirstState')
            .ask(speech, reprompt);
    },

    'END': function() {
        // Triggered when the session ends
        // Currently supporting AMAZON.StopIntent and reprompt timeouts
        let speech = this.speechBuilder()
            .addText("Goodbye. I'll be keeping your house safe.")
        this.tell(speech);
    },

    'FirstState': {
        'lockDoorIntent': function() {
            this.tell("Your front door is now locked.");
        },

        'HelpIntent': function() {
            let speech = this.speechBuilder()
                .addText("I can help you control Smart Locks. Say lock the front door or unlock my front door.")
            let reprompt = this.speechBuilder()
                .addText("Say lock the front door or unlock my front door.")
            this.ask(speech, reprompt);
        },

        // Test fails if this is commented out
        'Unhandled': function(name) {
            this.ask('What\'s your name?');
        },
    },

    'MyNameIsIntent': function(name) {
        this.tell('Hey ' + name.value + ', nice to meet you!');
    },

});

module.exports.app = app;
