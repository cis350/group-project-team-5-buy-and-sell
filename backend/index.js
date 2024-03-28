// import the express app
const webapp = require('./controllers/server.js');
const { PORT } = require('./config.js');

// start the web server
webapp.listen(PORT, () =>{
    console.log('Server running on port', PORT);
})