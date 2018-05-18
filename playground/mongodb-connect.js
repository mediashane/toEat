// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toEatApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect: ', err);
    }

    console.log('Connected to MongoDB server');

    // db.collection('toEats').insertOne({
    //     text: 'Eat at Jib',
    //     completed: false,
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert toEat', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    
    // db.collection('Users').insertOne({
    //     name: 'Oscar',
    //     age: 34,
    //     location: 'Bali',
    //     completed: false,
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert new user.', err);
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    db.close();
});