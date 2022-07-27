const axios = require('axios').default;
const config = require('./config');
const path = require('path');

// Link to views folder.
let views = path.join(__dirname, '../');

const renderVideoPage = async (req, res) => {
    const videoId = req.params.videoId;
    if (!videoId) {
        res.redirect('http://immi.io');
    } else {
        const video = await axios.get(`${config.API_URL}/user-generated-content/${videoId}`, { headers: { 'Authorization': `APIKEY ${config.API_KEY}` } });
        if (video) {
            res.render('index', { root: views, video: video.data });
        } else {
            res.redirect('http://immi.io');
        }
    }
}

module.exports = {
    renderVideoPage,
}