'use strict';

const expect = require('chai').expect;

const getPlatformRequestBuilder = require('jovo-framework').util.getPlatformRequestBuilder;
const {send} = require('jovo-framework').TestSuite;


for (let rb of getPlatformRequestBuilder('AlexaSkill', 'GoogleActionDialogFlowV2')) {
    describe(`PLATFORM: ${rb.type()}`, () => {
        // Test isolated intents, "deep invocations"
        describe('lockDoorIntent-INTENTS', () => {
                // Invocation: "tell smart lock to lock" 
                it('should confirm door is locked', () => {
                    return send(rb.intent('lockDoorIntent'))
                        .then((res) => {
                            // using isTell() because the customer doesn't need to respond to their door being locked
                            const matchesResponse = res.isTell(launchResponse, launchReprompt);
                            expect(matchesResponse).to.equal(true);
                        });
                });
                // Invocation: "tell smart lock to lock" 
                    it('should confirm door is locked', () => {
                        return send(rb.launch())
                            .then((res) => {
                                // using isTell() because the customer doesn't need to respond to their door being locked
                                const matchesResponse = res.isAsk(launchResponse, launchReprompt);
                                expect(matchesResponse).to.equal(true);
                            });
                    });
            });
        });
};

let launchResponse = "I can help you control Smart Locks. Say lock the front door or unlock the front door";
let launchReprompt = "Say lock the front door or unlock the front door";
let lockDoorIntentResponse = "Your door is now locked";