'use strict';
const app = require('./express/server');
const path = require('path');

const { renderVideoPage } = require('./express/logic');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Local request handlers.
app.get('/', renderVideoPage);
app.get('/:videoId', renderVideoPage);

// Start Server.
let port = 3005;
app.listen(port, function(){
  console.log(`Server started on port ${port}...`);
});