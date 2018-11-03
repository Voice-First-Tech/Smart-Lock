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
            .addText("I can help you control Smart Locks. Say lock the front door or unlock the front door")
        let reprompt = this.speechBuilder()
            .addText("Say lock the front door or unlock the front door")    
        this.followUpState('FirstState')
        .ask(speech, reprompt);
    },


    'FirstState': {
        'MyNameIsIntent': function(name) {
            this.toStatelessIntent('MyNameIsIntent', name);
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
