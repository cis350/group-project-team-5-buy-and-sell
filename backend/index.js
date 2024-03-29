// import the express app
const webapp = require('./controllers/server.js');
const { mongoDBURL } = require('./config.js');
const mongoose = require('mongoose');
const port = process.env.PORT || 80

// start the web server
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        webapp.listen(port, () => {
            console.log(`App is listening to port: ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
})