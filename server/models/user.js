const mongoose = require('mongoose');


const addUser = mongoose.model('addUser', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    }
});

const newUser = new addUser({
    email: 'shane@email.com',
});


newUser.save().then((doc) => {
    console.log(`Saved: ${doc}`, undefined, 2);
    }, (err) => {
        console.log('Unable to update');
});

module.exports = { addUser };