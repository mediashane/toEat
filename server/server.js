const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { toEat } = require('./models/eats');
const { addUser } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

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
    }, (err) => {
        res.status(400).send(err);
    })
})

app.get('/toeats/:id', (req, res) =>  {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    toEat.findById(id).then((eat) => { 
        if (!eat) {
          return res.status(404).send();
        }
        res.send({eat})
    }).catch((e) => console.log(e));

})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };