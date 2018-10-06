'use strict';

const expect = require('chai').expect;

const getPlatformRequestBuilder = require('jovo-framework').util.getPlatformRequestBuilder;
const {send} = require('jovo-framework').TestSuite;


for (let rb of getPlatformRequestBuilder('AlexaSkill', 'GoogleActionDialogFlowV2')) {
    describe(`PLATFORM: ${rb.type()}`, () => {
        // Test isolated intents, "deep invocations"
        describe('END-INTENTS', () => {
                // Invocation: "open smart lock"
                it('should return an cancel message', () => {
                    return send(rb.intent("AMAZON.CancelIntent"))
                        .then((res) => {
                            const matchesResponse = res.isTell(endResponse);
                            expect(matchesResponse).to.equal(true);
                        });
                });

                // Invocation: "open smart lock"
                it('should LAUNCH and then return a cancel message', () => {
                    return send(rb.launch())
                        .then((res) => {
                            const matchesResponse = res.isAsk(launchResponse, launchReprompt);
                            expect(matchesResponse).to.equal(true);
                            return send(rb.intent("AMAZON.CancelIntent"))
                        })
                        .then((res) => {
                            const matchesResponse = res.isTell(endResponse);
                            expect(matchesResponse).to.equal(true);
                        });
                });
        });
    });
}

let launchResponse = "I can help you control Smart Locks. Say lock the front door or unlock my front door.";
let launchReprompt = "Say lock the front door or unlock my front door.";
let endResponse = "Goodbye. I'll be keeping your house safe.";
