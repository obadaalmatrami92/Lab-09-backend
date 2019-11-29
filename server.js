'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/events', eventsHandler);


const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', e => console.error(e));


const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());



app.use('*', notfoundHandler);
app.use(errorHandler);


function locationHandler(request, response) {
    const city = request.query.data;
    location.getLocationData(city)
        .then(data => sendJson(data, response))
        .catch((error) => errorHandler(error, request, response));
}

function weatherHandler(request, response) {
    const location = request.query.data;
    weather(location)
        .then(summraise => sendJson(summraise, response))
        .catch((error) => errorHandler(error, request, response));
}

function eventsHandler(request, response) {
    const location = request.query.data.formatted_query;
    events(location)
        .then(eventslist => sendJson(eventslist, response))
        .catch((error) => errorHandler(error, request, response));
}



function sendJson(data, response) {
    response.status(200).json(data);

}


function notfoundHandler(request, response) {
    response.status(404).send('Huh ?');

}

function errorHandler(erorr, request, response) {
    response.status(500).send(error);

}



function startServer() {
    app.listen(PORT, () => console.log(`app is up on port ${PORT}`));
}

client.connect()
    .then(startServer)
    .catch(err => console.error(err));