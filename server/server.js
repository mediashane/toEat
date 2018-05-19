const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { toEat } = require('./models/eats');
const { addUser } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/toeats', (req, res) => {
    const newEat = new toEat({
        text: req.body.text
    });

    newEat.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/toeats', (req, res) => {
    toEat.find().then((toeats) => {
        res.send({toeats})
    }).catch((err) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };