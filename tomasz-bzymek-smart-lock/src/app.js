'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
      this.$speech.addText("Welcoem to your smart lock. Would you like to lock your door? Check the status of your door? Or unlock your door?");
      this.$reprompt.addText("Please say lock, status or unlock my door.");
      this.ask(this.$speech, this.$reprompt);
    },

    LockIntent() {
      let expextedLockPropmpt = "Your door is locked";
      let expextedUnlockPropmpt = "Your door is unlocked";
      let lockStatus = this.$inputs.lockStatus.value;

      if(lockStatus === "lock") {
        this.$speech.addText(expextedLockPropmpt);
      } else {
        this.$speech.addText(expextedUnlockPropmpt);
      }

      this.tell(this.$speech);
    },
});

module.exports.app = app;
