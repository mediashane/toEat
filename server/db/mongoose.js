const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let db = {
    localhost: 'mongodb://localhost:27017/toEat',
    mlab: 'mongodb://toeat:arsp0etica@ds229290.mlab.com:29290/toeat'
};
mongoose.connect( process.env.PROD_MONGODB ? db.mlab : db.localhost );


module.exports = { mongoose };