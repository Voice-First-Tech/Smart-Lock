'use strict';

const expect = require('chai').expect;

const getPlatformRequestBuilder = require('jovo-framework').util.getPlatformRequestBuilder;
const {send} = require('jovo-framework').TestSuite;


for (let rb of getPlatformRequestBuilder('AlexaSkill', 'GoogleActionDialogFlowV2')) {
    describe(`PLATFORM: ${rb.type()}`, () => {
        // Test isolated intents, "deep invocations"
        describe('LAUNCH-INTENTS', () => {
                // Invocation: "open Smart Lock"
                it('should return a welcome message "LAUNCH"', () => {
                    return send(rb.launch())
                        .then((res) => {
                            const matchesResponse = res.isAsk(launchResponse,launchRepromt);
                            expect(matchesResponse).to.equal(true);
                        });
                });
        });
    });
}

let launchResponse = "Welcome to the Smart Lock app. Say lock my front door or unlock my front door.";
let launchRepromt = "Say lock my front door or unlock my front door.";
