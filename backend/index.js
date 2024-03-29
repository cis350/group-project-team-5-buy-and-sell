// import the express app
const mongoose = require('mongoose');
const webapp = require('./controllers/server');
const { mongoDBURL } = require('./config');

const port = process.env.PORT || 80;

// start the web server
mongoose
    .connect(mongoDBURL)
    .then(() => {
        webapp.listen(port, () => {});
    });
