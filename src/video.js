const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const pug = require('pug');
const axios = require('axios').default;

const config = require('./config');

const app = express();
const router = express.Router();

// Video page route.
router.get('/:videoId', async (req, res) => {
    try {
        const videoId = req.params.videoId;
        if (!videoId) {
            res.redirect('http://immi.io');
        } else {
            const videoViewRoute = path.resolve('./src/views/videoPage.pug');
            const url = `${config.API_URL}/user-generated-content/${videoId}`;
            const headers = { 'Authorization': `APIKEY ${config.API_KEY}` };
            const video = await axios.get(url, { headers });
            if (video) {
                const { id, uid, thumbnail } = video.data;
                const videoView = pug.renderFile(videoViewRoute, { id, uid, thumbnail });
                res.set('Content-Type', 'text/html');
                res.send(Buffer.from(videoView));
            } else {
                res.redirect('http://immi.io');
            }
        }
    } catch (error) {
        console.log('Error => ', error.response.data);
        res.status(500);
        res.send('Failed to render video page');
    }
});

// Home route.
router.get('/', (req, res) => {
    try {
        const viewLocation = path.resolve('./src/views/index.pug');
        const defaultView = pug.renderFile(viewLocation);
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(defaultView));
    } catch (error) {
        console.log('Error => ', error);
        res.status(500);
        res.send('Failed to render defaut view');
    }
});

app.use(`/.netlify/functions/video`, router);

module.exports = app;
module.exports.handler = serverless(app);
