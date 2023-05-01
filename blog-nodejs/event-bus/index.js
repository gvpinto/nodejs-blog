const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const events = [];
const app = express();

app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;
    console.log(`event-bus: event received: ${event}`);
    events.push(event);
    axios.post('http://posts-srv:4000/events', event).catch((err) => console.log(err.message));
    // axios.post('http://localhost:4001/events', event).catch((err) => console.log(err.message));
    // axios.post('http://localhost:4002/events', event).catch((err) => console.log(err.message));
    // axios.post('http://localhost:4003/events', event).catch((err) => console.log(err.message));

    res.send({ status: "OK" });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('v0.2.1');
    console.log("Event Bus listening on port 4005");
});