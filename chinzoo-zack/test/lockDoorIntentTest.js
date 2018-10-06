'use strict';

const expect = require('chai').expect;

const getPlatformRequestBuilder = require('jovo-framework').util.getPlatformRequestBuilder;
const {send} = require('jovo-framework').TestSuite;


for (let rb of getPlatformRequestBuilder('AlexaSkill', 'GoogleActionDialogFlowV2')) {
    describe(`PLATFORM: ${rb.type()}`, () => {
        // Test isolated intents, "deep invocations"
        describe('lockDoorIntent-INTENTS', () => {
                // Invocation: "tell smart lock to lock the door"
                it('should confirm the door is locked', () => {
                    return send(rb.intent("lockDoorIntent"))
                        .then((res) => {
                            const matchesResponse = res.isTell(lockDoorIntentResponse);
                            expect(matchesResponse).to.equal(true);
                        });
                });

                // Invocation: "launch smart lock -> lock the door"
                it('should welcome after launching smart lock and comfirm the door is locked', () => {
                    return send(rb.launch())
                        .then((res) => {
                            const matchesResponse = res.isAsk(launchResponse, launchRepromt);
                            expect(matchesResponse).to.equal(true)
                            return send(rb.intent("lockDoorIntent"))
                        })
                        .then((res) => {
                            const matchesResponse = res.isTell(lockDoorIntentResponse);
                            expect(matchesResponse).to.equal(true);
                        });
                });
        });
    });
}

let launchResponse = "Welcome to the Smart Lock app. Say lock my front door or unlock my front door.";
let launchRepromt = "Say lock my front door or unlock my front door.";
let lockDoorIntentResponse = "Your door is locked.";
