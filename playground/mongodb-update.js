// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toEatApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect: ', err);
    }

    console.log('Connected to MongoDB server');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5afe6a541718b8245044f786")
    }, {
        $set: {
            name: 'Jack',
        }
    }, {
        returnOriginal: false       
        
    }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5afe6a541718b8245044f786")
    }, {
        $inc: {
            age: 10,
        }
    }, {
        returnOriginal: false       
        
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});