// import the express app
const webapp = require('./controllers/server.js');
const { PORT, mongoDBURL } = require('./config.js');
const mongoose = require('mongoose');

// start the web server
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        webapp.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
})