[![CircleCI](https://circleci.com/gh/bespoken/logless-client/tree/master.svg?style=svg)](https://circleci.com/gh/bespoken/logless-client/tree/master)
[![codecov](https://codecov.io/gh/bespoken/logless-client/branch/master/graph/badge.svg)](https://codecov.io/gh/bespoken/logless-client)
[![npm](https://img.shields.io/npm/v/logless-client.svg)](https://www.npmjs.com/package/logless-client)

# logless-client

Logless will automatically capture logs and diagnostics for your Node.js Lambda, Google Cloud Function or Express.js service.

Before you integrate the code, you will need to a key. You get it from [the Bespoken Dashboard](https://apps.bespoken.io/dashboard).
Once integrated, this is where your logs and data will be viewable.

Install the dependency

<pre><code>
    $npm install bespoken-tools --save
</code></pre>

To use it with Lambdas, simply wrap your function handler, like so:
<pre><code>
    var bst = require('bespoken-tools');

    exports.handler = bst.Logless.capture("&lt;SECRET_KEY&gt;", function (event, context) {
        // Lambda code goes here
        context.done(null, "Hello World");
    });

</code></pre>

To use it with Google Cloud Functions, simply wrap your function handler:
<pre><code>
    var bst = require('bespoken-tools');

    exports.hello = bst.Logless.capture("&lt;SECRET_KEY&gt;", function (request, response) {
        // Cloud Function code goes here
        response.json({ foo: "bar" });
    });

</code></pre>

To use it with Express.js, simply configure it with your routes:
<pre><code>
    var bst = require('bespoken-tools');

    var logless = bst.Logless.middleware("&lt;SECRET_KEY&gt;");
    app = express();

    app.use(bodyParser.json());
    app.use(logless.requestHandler);

    // Application handlers and routers registered here
    app.post("/", function {
        ...
    });

    // The Logless error handler must be registered last
    app.use(logless.errorHandler);

</code></pre>

That's all there is to it. Then you can see all your logs through our handy dashboard!

We will effortlessly capture and format:
<ul>
    <li>Request and response payloads
    <li>Console output (including instrumentation for timing and all debug levels)
    <li>Error and stack traces
</ul>