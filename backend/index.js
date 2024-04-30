// import the express app
const webapp = require('./controllers/server');

const port = process.env.PORT || 80;

// start the web server
webapp.listen(port, () => {
    console.log('Server running on port', port);
});
