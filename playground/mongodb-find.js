// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toEatApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect: ', err);
    }

    console.log('Connected to MongoDB server');

    db.collection('Users').find({ name: 'Oscar' }).toArray().then((docs) => {
        
        console.log(' Matching Users: ', JSON.stringify(docs, undefined, 2));

    }, (err) => {
        console.log('Unable to find documents: ', err);
    });

    db.collection('toEats').find().count().then((count) => {
        
        console.log(`toEats count: ${count}`);

    }, (err) => {
        console.log('Unable to find counts: ', err);
    });

    // db.close();
});