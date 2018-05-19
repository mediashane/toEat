const mongoose = require('mongoose');

const toEat = mongoose.model('toEat', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// const newEat = new toEat({
//     text: 'Cooked dinner at home',
//     completed: true,
//     completedAt: Date.now(),
// });

// newEat.save().then((doc) => {
//     console.log(`Saved: ${doc}`, undefined, 2);
//     }, (err) => {
//         console.log('Unable to update');
// });

module.exports = { toEat };