'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const { renderVideoPage } = require('./logic');

const router = express.Router();


// Home route.
router.get('/:videoId', renderVideoPage);

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda (express/server.js)

module.exports = app;
module.exports.handler = serverless(app);
module.exports.renderVideoPage = renderVideoPage;
