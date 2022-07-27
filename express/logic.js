const axios = require('axios').default;
const config = require('./config');
const path = require('path');
const pug = require('pug');

// Link to views folder.
let views = path.join(__dirname, '../');

console.log('Views => ', views);

const renderVideoPage = async (req, res) => {
    const videoId = req.params.videoId;
    if (!videoId) {
        res.redirect('http://immi.io');
    } else {
        const video = await axios.get(`${config.API_URL}/user-generated-content/${videoId}`, { headers: { 'Authorization': `APIKEY ${config.API_KEY}` } });
        if (video) {
            const videoView = pug.renderFile(`${views}/views/videoPage.pug`, { video: video.data });
            console.log('VideoView => ', videoView);
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from(videoView));
        } else {
            res.redirect('http://immi.io');
        }
    }
}

module.exports = {
    renderVideoPage,
}