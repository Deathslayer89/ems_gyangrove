const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./api/routes/eventRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/events', eventRoutes);


app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

module.exports = app;