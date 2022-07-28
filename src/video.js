const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const pug = require('pug');
const axios = require('axios').default;

const config = require('./config');

const app = express();
const router = express.Router();

// Video page route.
router.get('/video/:videoId', async (req, res) => {
    try {
        const videoId = req.params.videoId;
        if (!videoId) {
            res.redirect('http://immi.io');
        } else {
            const videoViewRoute = path.resolve('./src/views/videoPage.pug');
            console.log('videoViewRoute => ', videoViewRoute);
            const url = `${config.API_URL}/user-generated-content/${videoId}`;
            const headers = { 'Authorization': `APIKEY ${config.API_KEY}` };
            const video = await axios.get(url, { headers });
            if (video) {
                console.log('video => ', video.data);
                const { id, uid, thumbnail } = video.data;
                const videoView = pug.renderFile(videoViewRoute, { id, uid, thumbnail });
                console.log('videoView => ', videoView);
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
        console.log('viewLocation => ', viewLocation);
        const defaultView = pug.renderFile(viewLocation);
        console.log('defaultView => ', defaultView);
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(defaultView));
    } catch (error) {
        console.log('Error => ', error);
        res.status(500);
        res.send('Failed to render defaut view');
    }
});

// app.use(`/.netlify/functions/express`, router);


app.use(router);

module.exports = app;
module.exports.handler = serverless(app);
