'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    // logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function() {
        let speech = this.speechBuilder()
            .addText("Welcome to the Smart Lock app. Say lock my front door or unlock my front door.");
        let repromt = this.speechBuilder()
            .addText("Say lock my front door or unlock my front door.");
        this.followUpState('FirstState')
            .ask(speech, repromt);
    },

    'FirstState': {
        'lockDoorIntent': function(name) {
            this.tell("Your door is locked.");
        },

        // // Test fails if this is commented out
        // 'Unhandled': function(name) {
        //     this.ask('What\'s your name?');
        // },
    },

    'MyNameIsIntent': function(name) {
        this.tell('Hey ' + name.value + ', nice to meet you!');
    },

});

module.exports.app = app;
