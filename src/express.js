const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const pug = require('pug');
const axios = require('axios').default;

const config = require('./config');

const app = express();
const router = express.Router();
const views = path.resolve('./views/');

// Video page route.
router.get('/:videoId',async (req, res) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId) {
      res.redirect('http://immi.io');
    } else {
      const video = await axios.get(`${config.API_URL}/user-generated-content/${videoId}`, { headers: { 'Authorization': `APIKEY ${config.API_KEY}` } });
      if (video) {
        const { id, uid } = video.data
        const videoView = pug.renderFile(`${views}/videoPage.pug`, { id, uid });
        console.log('VideoView => ', videoView);
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(videoView));
      } else {
        res.redirect('http://immi.io');
      }
    }
  } catch (error) {
    console.log('Error => ', error);
    res.send('Failed to render video page').statusCode(500);
  }
});

// Home route.
router.get('/', (req, res) => {
  try {
    console.log('views => ', views)
    const viewLocation = `${views}/index.pug`;
    console.log('ViewLocation => ', viewLocation);
    const defaultView = pug.renderFile(viewLocation);
    console.log('defaultView => ', defaultView);
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(defaultView));
  } catch (error) {
    console.log('Error => ', error);
    res.send('Failed to render defaut view').statusCode(500);
  }
});

app.use(`/.netlify/functions/express`, router);

module.exports = app;
module.exports.handler = serverless(app);
