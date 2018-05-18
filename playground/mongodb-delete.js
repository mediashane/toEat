// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toEatApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect: ', err);
    }

    console.log('Connected to MongoDB server');

    db.collection('toEats').findOneAndDelete({ text: 'Eat at Rucko'}).then((result) => {
        console.log(result);
    });

    // db.close();
});