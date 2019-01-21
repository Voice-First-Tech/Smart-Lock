'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return a welcome message and ask for the name at "LAUNCH"', async () => {
            const conversation = testSuite.conversation();

            const launchRequest = await testSuite.requestBuilder.launch();
            const responseLaunchRequest = await conversation.send(launchRequest);
            expect(
                responseLaunchRequest.isAsk(expectedLaunchPrompt, expectedLaunchReprompt)
            ).toBe(true);

        });
    });
}

let expectedLaunchPrompt = 'Welcome to your smart lock. Would you like to lock your door? Check the status of your door? Or unlock your door?'
let expectedLaunchReprompt = 'Please say lock, status of my door, Or unlock to control your door.'
